import { motion, AnimatePresence } from 'framer-motion';
import { ICategory } from '@/interfaces/index';
import { X, ShoppingBag, Calendar, Tag } from 'lucide-react';

interface CategoryDetailProps {
  category:  ICategory | null;
  onClose: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, onClose }) => {


  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            { category ? (
              <>
                <div className="h-80 relative overflow-hidden">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <motion.button
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 text-white"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-4xl font-bold tracking-tight">{category.name}</h2>
                    <motion.div
                      className="h-1 w-20 bg-indigo-500 mt-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </motion.div>
                </motion.div>
              </>
            ) : null}
          </div>
          
          <div className="p-8">
            { category ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Tag className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900">Category ID</h3>
                      <p className="text-gray-600 text-sm mt-1 font-mono">{category._id}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <ShoppingBag className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900">Slug</h3>
                      <p className="text-gray-600 text-sm mt-1">{category.slug}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Calendar className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900">Created</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {new Date(category.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryDetail;