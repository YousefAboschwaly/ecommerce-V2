import { IProduct } from '@/interfaces';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/Context/CartContext';
import { WishlistContext } from '@/Context/WishlistContext';

interface IProps {
  products: IProduct[];
}

export default function ProductCard({ products }: IProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }
  const { addToCart } = cartContext;

  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) {
    throw new Error("WishlistContext must be used within a WishlistContextProvider");
  }
  const { addToWishlist, removeFromWishlist, query } = wishlistContext;

  const [wishlistStatus, setWishlistStatus] = useState<Record<string, boolean>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [cartLoadingStates, setCartLoadingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (query.data) {
      const newStatus: Record<string, boolean> = {};
      query.data.data.forEach(item => {
        newStatus[item._id] = true;
      });
      setWishlistStatus(newStatus);
    }
  }, [query.data]);

  const handleWishlistToggle = async (productId: string) => {
    setLoadingStates(prev => ({ ...prev, [productId]: true }));
    
    try {
      if (wishlistStatus[productId]) {
        await removeFromWishlist(productId);
        setWishlistStatus(prev => ({ ...prev, [productId]: false }));
      } else {
        await addToWishlist(productId);
        setWishlistStatus(prev => ({ ...prev, [productId]: true }));
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (productId: string) => {
    setCartLoadingStates(prev => ({ ...prev, [productId]: true }));
    try {
      await addToCart(productId);
    } finally {
      setCartLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <Card className="overflow-hidden group product">
            <div className="relative">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <CardContent className="p-0">
                  <motion.img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Link>
              
              <motion.button
                className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm ${
                  wishlistStatus[product.id] ? 'text-red-500' : 'text-gray-600'
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleWishlistToggle(product.id)}
                disabled={loadingStates[product.id]}
              >
                {loadingStates[product.id] ? 
                  <Loader2 className="w-6 h-6 animate-spin" /> : 
                  <Heart className={`w-6 h-6 ${wishlistStatus[product.id] ? 'fill-current' : ''}`} />
                }
              </motion.button>
            </div>

            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <CardContent className="p-0">
                <div className="p-4 space-y-2">
                  <p className="text-sm text-green-600">{product.category.name}</p>
                  <h3 className="font-semibold">{product.title.split(' ').splice(0,2).join(' ')}</h3>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {product.price} EGP
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{product.ratingsAverage}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>

            <div className="p-4">
              <Button 
                className="add-btn w-full bg-green-600 hover:bg-green-700 translate-y-[150%] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
                onClick={() => handleAddToCart(product.id)}
                disabled={cartLoadingStates[product.id]}
              >
                {cartLoadingStates[product.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add +"}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export { ProductCard };