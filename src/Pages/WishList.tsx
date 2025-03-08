import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Filter, X } from 'lucide-react';
import type { IWishListProduct } from '@/interfaces/index';
import { WishListItem } from '@/MyComponents/WishListItem';
import { WishlistContext } from '@/Context/WishlistContext';
import LoadingScreen from '@/MyComponents/LoadingScreen';

export default function WishList() {
  const wishlistContext = useContext(WishlistContext);

  if (!wishlistContext) {
    throw new Error("Context providers must be used within their providers");
  }

  const  { query, isLoading, removeFromWishlist }= wishlistContext;
  const { data: wishlist } = query;
  const [products, setProducts] = useState<IWishListProduct[]|null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use useEffect to update products when wishlist data changes
  useEffect(() => {
    if (!isLoading && wishlist) {
      setProducts(wishlist.data);
    }
  }, [isLoading, wishlist]);

  const categories = Array.from(new Set(products?.map(p => p.category.name) || []));
  const totalValue = products?.reduce((sum, product) => sum + (product.priceAfterDiscount || product.price), 0) || 0;

  if (isLoading) return <LoadingScreen />;

  const filteredProducts = selectedCategory
    ? products?.filter(p => p.category.name === selectedCategory)
    : products;



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              Total value: <span className="font-semibold">EGP{totalValue.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
              <span>Filter</span>
            </motion.button>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">{products?.length || 0}</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !selectedCategory 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </motion.button>
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredProducts?.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                {product && <WishListItem
                  product={product}
                  onRemove={removeFromWishlist}
                />}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {(!products || products.length === 0) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block"
            >
              <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-medium text-gray-600 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Start adding some items to your wishlist!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
  
}