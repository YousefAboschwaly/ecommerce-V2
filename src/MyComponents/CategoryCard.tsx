import React from 'react';
import { motion } from 'framer-motion';
import { ICategory } from '@/interfaces/index';

interface CategoryCardProps {
  category: ICategory;
  index: number;
  onClick: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, onClick }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group bg-gradient-to-br from-white to-gray-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
      }}
      onClick={() => onClick(category._id)}
    >
      <div className="relative h-72 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
        <motion.img 
          src={category.image} 
          alt={category.name}
          className="object-cover w-full h-full"
          initial={{ scale: 1.2, filter: "blur(5px)" }}
          animate={{ 
            scale: 1, 
            filter: "blur(0px)",
            transition: { duration: 0.8, delay: index * 0.1 }
          }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.7 }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 text-white z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          <h3 className="text-2xl font-bold tracking-tight">{category.name}</h3>
          <motion.div 
            className="h-1 w-12 bg-indigo-500 mt-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
          />
        </motion.div>
        
        <motion.div
          className="mt-3 flex items-center space-x-2 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
        >
          <span className="text-sm">Explore Collection</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
      >
        {category.slug}
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;