import BrandGrid from '../MyComponents/BrandGrid';
import { Layers } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {


  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  const {data:brands,isLoading,error}= useQuery({
    queryKey:['gatAllBrands'],
    queryFn:getBrands,
    select:(data)=>data.data.data
  })
  console.log(brands)



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-12">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg"
          style={{ animation: 'pulse 3s infinite ease-in-out' }}
        >
          <Layers className="h-8 w-8 text-white" />
        </div>
        <h1 
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}
        >
          BrandShowcase
        </h1>
      </div>

      <div 
        className="text-center mb-12"
        style={{ animation: 'fadeInUp 0.8s ease-out forwards', animationDelay: '0.2s' }}
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
          Explore Top Brands
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a curated collection of premium brands from around the world. 
          Browse through our extensive catalog and find your favorites.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-r-2 border-l-2 border-purple-600 absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>Error in showing Brands </p>
        </div>
      ) : (
        <BrandGrid brands={brands} />
      )}
    </div>
  </div>
  );
}

