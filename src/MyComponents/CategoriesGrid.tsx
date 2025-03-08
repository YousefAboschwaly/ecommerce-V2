import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ICategory } from '@/interfaces/index';
import CategoryCard from './CategoryCard';
import CategoryDetails from './CategoryDetails';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CategoriesGrid: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  const {data:categories,isLoading,isError,error} = useQuery({
    queryKey:['categories'],
    queryFn:getCategories,
    select:(data)=>data.data.data
  })

console.log(categories)
  

  const handleCategoryClick = (category:ICategory) => {
    setSelectedCategory(category);
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };

  const filteredCategories = categories?.filter((category:ICategory) => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 2, ease: "linear" },
            scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="text-indigo-600"
        >
          <ShoppingBag size={60} strokeWidth={1.5} />
        </motion.div>
        <motion.p 
          className="mt-6 text-xl text-indigo-900 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Discovering amazing categories...
        </motion.p>
        <motion.div 
          className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="h-full bg-indigo-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.2 }}
            className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Oops! Something went wrong
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {error ? (error as Error).message : ""}
          </motion.p>
          <motion.button
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <motion.h1 
          className="text-5xl font-bold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Discover Our Collections
        </motion.h1>
        <motion.div
          className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-6 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.p 
          className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Explore our curated categories and find products that match your style and needs.
          From the latest electronics to trendy fashion, we've got everything you desire.
        </motion.p>
      </motion.div>

      <motion.div 
        className="relative max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <Filter className="h-4 w-4" />
            <span className="text-sm">{filteredCategories.length} results</span>
          </div>
        </div>
      </motion.div>

      {filteredCategories.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Search className="h-10 w-10 text-indigo-600" />
          </motion.div>
          <h3 className="text-xl font-medium text-gray-900">No categories found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search term</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category:ICategory, index:number) => (
            <CategoryCard
              key={category._id}
              category={category}
              index={index}
              onClick={()=>handleCategoryClick(category)}
            />
          ))}
        </div>
      )}

      <CategoryDetails    
        category={selectedCategory }
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default CategoriesGrid;