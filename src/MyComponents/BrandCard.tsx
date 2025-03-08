import { IBrand } from '@/interfaces';
import React from 'react';

interface BrandCardProps {
  brand: IBrand;
  index: number;
  onClick: (brand: IBrand) => void;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, index, onClick }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-110 bg-white cursor-pointer"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
      onClick={() => onClick(brand)}
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-full h-40 flex items-center justify-center p-4 mb-4 overflow-hidden">
          <img 
            src={brand.image} 
            alt={brand.name} 
            className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110 hover:rotate-3"
            loading="lazy"
            style={{
              animation: 'pulse 3s infinite ease-in-out',
              animationDelay: `${index * 0.2}s`
            }}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{brand.name}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mb-2 transform transition-all duration-300 hover:w-20"></div>
      </div>
    </div>
  );
};

export default BrandCard;