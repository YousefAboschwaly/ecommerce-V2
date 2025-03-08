import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  ArrowRight,
  Gift,
  Shield,
  Trash,
} from "lucide-react";
import { CartItem } from "../MyComponents/CartItem";
import type { ICart } from "../interfaces/index";
import { CartContext } from "@/Context/CartContext";
import LoadingScreen from "@/MyComponents/LoadingScreen";
import axios from "axios";
import { UserContext } from "@/Context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

type CartItemType = ICart["data"]["products"][number];

export default function Cart() {
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  if (!userContext || !cartContext) {
    throw new Error("Context providers must be used within their providers");
  }

  const { userToken } = userContext;
  const { query } = cartContext;
  const { data: cart, isLoading, isError } = query;

  // Update quantity mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, newCount }: { id: string; newCount: number }) => {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        { headers: { token: userToken } }
      );
      console.log(data);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Remove item mutation
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: userToken } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: userToken } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error loading cart</div>;
  if (!cart) return <div>No cart data</div>;


  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100">
      {/* Loading overlay */}
      <AnimatePresence>
        {(updateMutation.isLoading ||
          removeMutation.isLoading ||
          clearMutation.isLoading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#10b981" // Emerald color
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="w-20 h-20 bg-white rounded-2xl shadow-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <ShoppingBag className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-transparent bg-clip-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Shopping Cart
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {cart.data.products.length}{" "}
            {cart.data.products.length === 1 ? "item" : "items"} selected for
            your wardrobe
          </motion.p>
          {cart.data.products.length > 0 && (
            <motion.button
              onClick={() => clearMutation.mutate()}
              disabled={clearMutation.isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto hover:bg-red-600 transition-colors duration-300"
            >
              <Trash className="w-5 h-5" />
              Clear Cart
            </motion.button>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.data.products.map((item: CartItemType, index: number) => (
                <CartItem
                  key={item._id}
                  index={index}
                  item={item}
                  isClearing={clearMutation.isLoading}
                  onUpdateQuantity={(id, count) =>
                    updateMutation.mutate({ id, newCount: count })
                  }
                  onRemove={(id) => removeMutation.mutate(id)}
                />
              ))}
              {cart.data.products.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-gray-500 text-xl">Your cart is empty</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <motion.span
                  key={cart.data.totalCartPrice}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-semibold"
                >
                  ${cart.data.totalCartPrice}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  ${(cart.data.totalCartPrice * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total</span>
                <motion.div
                  key={cart.data.totalCartPrice}
                  className="text-right"
                >
                  <motion.span
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="block text-3xl font-bold text-violet-600"
                  >
                    ${(cart.data.totalCartPrice * 1.1).toFixed(2)}
                  </motion.span>
                  <span className="text-sm text-gray-500">Including VAT</span>
                </motion.div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-violet-600" />
                <span>Secure checkout with SSL encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-violet-600" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Gift className="w-5 h-5 text-violet-600" />
                <span>Gift wrapping available</span>
              </div>
            </div>
              <Link to="/checkout">
            <motion.button
              
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-200"
            >
              Complete Purchase
              <ArrowRight className="w-5 h-5" />
            </motion.button>
              </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
