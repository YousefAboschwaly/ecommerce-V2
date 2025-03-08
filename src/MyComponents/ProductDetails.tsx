import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "./Star-rating"
import { ImageSlider } from "./Image-slider"
import { ShoppingCart, Heart, Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"
import axios from "axios"
import LoadingScreen from "./LoadingScreen"
import RelatedProducts from "./RelatedProducts"
import type { IProductDetails } from "@/interfaces"
import { CartContext } from "@/Context/CartContext"
import { WishlistContext } from "@/Context/WishlistContext"

export default function ProductDetail() {
  const [productDetails, setProductDetails] = useState<IProductDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const { id, category } = useParams<{ id: string; category: string }>()
  
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }
  const { addToCart, isLoading: cartLoading } = cartContext;

  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) {
    throw new Error("WishlistContext must be used within a WishlistContextProvider");
  }
  const { addToWishlist, removeFromWishlist, query, isLoading: wishlistLoading } = wishlistContext;

  const getProductDetails = async (productId: string) => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      setProductDetails(data.data)
    } catch (error) {
      console.error("Error fetching product details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if product is in wishlist
  useEffect(() => {
    if (query.data && id) {
      const isLiked = query.data.data.some(item => item._id === id);
      setIsInWishlist(isLiked);
    }
  }, [query.data, id]);

  useEffect(() => {
    if (id) {
      getProductDetails(id)
    }
  }, [id, category])

  const handleWishlistToggle = async () => {
    if (!id) return;
    
    if (isInWishlist) {
      await removeFromWishlist(id);
      setIsInWishlist(false);
    } else {
      await addToWishlist(id);
      setIsInWishlist(true);
    }
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!productDetails) {
    return <div className="text-center py-10 text-gray-600">Product not found or failed to load.</div>
  }

  const LikeEffect = () => (
    <AnimatePresence>
      {isInWishlist && (
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
  )

  return (
    <main className="py-12 px-6 bg-gray-100 min-h-screen">
      <Card className="overflow-hidden bg-white shadow-2xl rounded-3xl">
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
                      isInWishlist
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-white text-gray-400 border border-gray-200 hover:border-red-500 hover:text-red-500"
                    }`}
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <motion.div
                        initial={false}
                        animate={{ 
                          scale: isInWishlist ? [1, 1.2, 1] : 1, 
                          rotate: isInWishlist ? [0, 15, -15, 0] : 0 
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Heart className={`h-6 w-6 ${isInWishlist ? "fill-current" : ""}`} />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" 
                  onClick={() => addToCart(id || "")} 
                  disabled={cartLoading}
                >
                  {cartLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-16">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-8 relative">
          <span className="relative z-10">Related Products</span>
        </h2>
        <RelatedProducts category={category || ""} />
      </div>
    </main>
  )
}