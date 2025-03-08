import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import type { ICart } from "../interfaces/index";
import { Link } from "react-router-dom";

// Define the proper CartItemType based on ICart's products array
type CartItemType = ICart["data"]["products"][number];

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, newCount: number) => void;
  onRemove: (id: string) => void;
  index: number;
  isClearing: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  index,
  isClearing,
}) => {
  const subtotal = item.count * item.price;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        isClearing
          ? {
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2, delay: index * 0.1 },
            }
          : {
              opacity: 0,
              x: -100,
              transition: { duration: 0.3 },
            }
      }
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-100"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/productdetails/${item.product._id}/${item.product.category.name}`}
            >
              <motion.img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-between p-4"
              >

                <motion.div
                  className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.product.quantity} left
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-4">
            <div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-2 leading-tight"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {item.product.title}
              </motion.h3>
              <motion.div
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.product.ratingsAverage)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({item.product.ratingsAverage})
                </span>
              </motion.div>
              <motion.div
                className="flex flex-wrap items-center gap-2 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                  {item.product.brand.name}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                  {item.product.category.name}
                </span>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(item.product._id)}
              className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <motion.div
                className="flex items-center gap-2 bg-emerald-50 rounded-xl p-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    item.count - 1 < 1
                      ? onRemove(item.product._id)
                      : onUpdateQuantity(
                          item.product._id,
                          Math.max(1, item.count - 1)
                        )
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>

                <motion.span
                  key={item.count}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-10 text-center font-semibold"
                >
                  {item.count}
                </motion.span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    onUpdateQuantity(item.product._id, item.count + 1)
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </motion.div>

              <div className="text-gray-500">
                <span className="font-medium">${item.price}</span> per item
              </div>
            </div>

            <motion.div layout className="flex flex-col items-end">
              <motion.div
                key={subtotal}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 text-transparent bg-clip-text"
              >
                ${subtotal}
              </motion.div>
              <span className="text-sm text-gray-500">Subtotal</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
