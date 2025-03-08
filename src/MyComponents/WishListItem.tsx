import { motion } from 'framer-motion';
import {  Star, ShoppingCart, Trash2 } from 'lucide-react';
import type { IWishListProduct } from '@/interfaces/index';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '@/Context/CartContext';

interface IProps {
  product: IWishListProduct;
  onRemove: (id: string) => void;
}

export function WishListItem({ product, onRemove }:IProps ) {
  const discount = product.priceAfterDiscount 
    ? ((product.price - product.priceAfterDiscount) / product.price) * 100
    : 0;
    const cartContext = useContext(CartContext);
    if (!cartContext) {
      throw new Error("UserContext must be used within a UserContextProvider");
    }
    const {addToCart,isLoading:CartLoading} = cartContext;
  return (
    <motion.div
      layout
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <Link to={`/productdetails/${product._id}/${product.category.name}`}>
        
        <motion.img 
          src={product.imageCover} 
          alt={product.title}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(product._id)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {discount.toFixed(0)}% OFF
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src={product.brand.image} 
              alt={product.brand.name}
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-medium text-gray-600">{product.brand.name}</span>
          </motion.div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{product.ratingsAverage}</span>
            <span className="text-xs text-gray-500">({product.ratingsQuantity})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                EGP {product.priceAfterDiscount || product.price}
              </span>
              {product.priceAfterDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  EGP {product.price}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {product.sold.toLocaleString()} sold
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => {addToCart(product._id?product._id:"");onRemove(product._id)}} disabled={CartLoading}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}