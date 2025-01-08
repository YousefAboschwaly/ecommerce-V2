"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./Star-rating";
import { ImageSlider } from "./Image-slider";
import { ShoppingCart, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

interface ProductDetails {
  images: string[];
  title: string;
  description: string;
  price: number;
  ratingsAverage: number;
}

export default function ProductDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  const getProductDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!productDetails) {
    return (
      <div className="text-center py-10 text-gray-600">
        Product not found or failed to load.
      </div>
    );
  }

  const LikeEffect = () => (
    <AnimatePresence>
      {isLiked && (
        <motion.div
          key="like-effect"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 0] }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Heart className="h-16 w-16 text-red-500 fill-current" />
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <main className=" py-12 px-6 bg-gray-100 min-h-screen ">
      <Card className="overflow-hidden bg-white shadow-2xl rounded-3xl  ">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:p-8">
              <ImageSlider images={productDetails.images || []} />
            </div>
            <div className="p-8 lg:pr-12 flex flex-col justify-evenly bg-gradient-to-br from-gray-50 to-white">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold mb-4 text-gray-800 leading-tight"
                >
                  {productDetails.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6"
                >
                  <StarRating rating={productDetails.ratingsAverage} />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600 mb-8 leading-relaxed"
                >
                  {productDetails.description}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center relative">
                  <span className="text-5xl font-bold text-gray-800">
                    ${productDetails.price.toFixed(2)}
                  </span>


                  <LikeEffect />


                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isLiked
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-400 border border-gray-200 hover:border-red-500 hover:text-red-500'
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: isLiked ? [1, 1.2, 1] : 1 ,
                      rotate: isLiked ? [0, 15, -15, 0] : 0,
                    }}
                    
                    
                    transition={{ duration: 0.4 }}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.div>
                </motion.button>



                
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
