import  { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, Phone, ArrowLeft, Shield, Truck, Gift, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { CartContext } from '@/Context/CartContext';
import LoadingScreen from '@/MyComponents/LoadingScreen';
import { Link } from 'react-router-dom';
import * as Yup from "yup"
import { useFormik } from 'formik';

interface IFormData {
  details: string;
  phone: string;
  city: string;
}

const ErrorMessage = ({ message }: { message: string }) => (
  <AnimatePresence> 
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="text-red-500 text-sm flex items-center mt-1"
  >
    <AlertCircle className="w-4 h-4 mr-1" />
    {message}
  </motion.div>
</AnimatePresence>
)

export const Checkout = () => {

  const cartContext = useContext(CartContext);

  if ( !cartContext) {
    throw new Error("Context providers must be used within their providers");
  }

  const { query } = cartContext;
  const { data: cart, isLoading } = query;
  



  const handleCheckout = async (formValues:IFormData) => {
    console.log(formValues);
      setIsSubmitting(true);
    try {
      const {data} = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.cartId}?url=http://localhost:5174`,
        {
          shippingAddress: formValues,
        },{
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log("Checkout successful:", data);
      if(data.status === "success") {
        window.location.href= data.session.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

 const validationSchema = Yup.object({
   details: Yup.string().required("Please enter your address details"),
   phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "please Enter Valid Number").required("Please enter your phone number"),
   city: Yup.string().required("Please enter your city")
 });

  const{values , handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
    initialValues: {
      details:"",
      phone:"",
      city:""
    },
    validationSchema,
    onSubmit:handleCheckout
  })

  const [isSubmitting, setIsSubmitting] = useState(false);




  if(isLoading || !cart ) {
    return <LoadingScreen/>
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/cart">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </motion.button>
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-violet-100"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <CreditCard className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-transparent bg-clip-text mb-2"
              >
                Complete Your Order
              </motion.h1>
              <p className="text-gray-600 mb-8">
                Please fill in your shipping details below
              </p>

              <motion.form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Shipping Address
                    </label>
                    <div className="group relative transition-all duration-300">
                      <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                      <input
                        type="text"
                        value={values.details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="details"
                        id="details"
                        placeholder="Enter your complete address"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                          errors.details && touched.details && "border-red-500"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-focus-within:opacity-10 -z-10 transition-opacity duration-300" />
                    </div>

                    {errors.details && touched.details && (
                      <ErrorMessage message={errors.details} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="group relative transition-all duration-300">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                          errors.phone && touched.phone && "border-red-500"
                        }`}
                        
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-focus-within:opacity-10 -z-10 transition-opacity duration-300" />
                    </div>
                    {errors.phone && touched.phone && (
                      <ErrorMessage message={errors.phone} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      City
                    </label>
                    <div className="group relative transition-all duration-300">
                      <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                      <input
                        type="text"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="city"
                        id="city"
                        placeholder="Enter your city"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white/50 backdrop-blur-sm ${errors.city && touched.city && "border-red-500"}`}
                        
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-focus-within:opacity-10 -z-10 transition-opacity duration-300" />
                    </div>
                    {errors.city && touched.city && (
                      <ErrorMessage message={errors.city} />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    } transition-all duration-300 shadow-xl shadow-violet-200`}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Complete Order
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-violet-100 sticky top-8"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {cart.data.products.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/50"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium line-clamp-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.count}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${item.price * item.count}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${cart.data.totalCartPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-violet-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${(cart.data.totalCartPrice * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold">Total</span>
                  <motion.div className="text-right">
                    <motion.span
                      key={cart.data.totalCartPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600"
                    >
                      ${(cart.data.totalCartPrice * 1.1).toFixed(2)}
                    </motion.span>
                    <span className="text-sm text-gray-500">Including VAT</span>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-violet-600" />
                  </div>
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-violet-600" />
                  </div>
                  <span>Free shipping over $100</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-violet-600" />
                  </div>
                  <span>Gift wrapping available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};