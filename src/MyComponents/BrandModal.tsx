import React, { useEffect, useState } from 'react';
import { X, Calendar, Tag,  Globe, Star, ExternalLink } from 'lucide-react';
import { IBrand } from '@/interfaces';

interface BrandModalProps {
  brand: IBrand;
  onClose: () => void;
  category: string;
}

const BrandModal: React.FC<BrandModalProps> = ({ brand, onClose, category }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 50);
    
    // Hide body scrollbar when modal opens
    document.body.style.overflow = 'hidden';
    
    // Add event listener to close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    
    // Cleanup: restore body scrollbar and remove event listener
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      // Restore body scrollbar when modal closes
      document.body.style.overflow = 'auto';
    }, 300); // Wait for animation to complete
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'electronics': return 'from-blue-500 to-cyan-500';
      case 'fashion': return 'from-pink-500 to-rose-500';
      case 'beauty': return 'from-purple-500 to-violet-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'electronics': return '💻';
      case 'fashion': return '👕';
      case 'beauty': return '💄';
      default: return '🏢';
    }
  };

  const getRandomStats = () => {
    return {
      founded: 1900 + Math.floor(Math.random() * 120),
      products: 10 + Math.floor(Math.random() * 990),
      countries: 5 + Math.floor(Math.random() * 195),
      rating: (3 + Math.random() * 2).toFixed(1)
    };
  };

  // Generate a website URL based on brand name
  const getBrandWebsite = (brandName: string) => {
    const domain = brandName.toLowerCase().replace(/\s+/g, '');
    return `https://www.${domain}.com`;
  };

  const stats = getRandomStats();
  const websiteUrl = getBrandWebsite(brand.name);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={handleClose}
    >
      {/* Modal container - centered on screen */}
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] relative overflow-hidden"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 group"
          onClick={handleClose}
        >
          <X className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
        </button>
        
        {/* Header with gradient */}
        <div className={`h-48 bg-gradient-to-r ${getCategoryColor(category)} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.1 + Math.random() * 0.4
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-md"></div>
              <div className="relative bg-white rounded-full p-5 shadow-xl">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="h-24 w-24 object-contain"
                  style={{
                    animation: 'float 6s infinite ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content with custom scrollbar */}
        <div className="modal-scrollbar overflow-y-auto" style={{ maxHeight: 'calc(90vh - 12rem)' }}>
          <div className="px-6 py-5">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {brand.name}
            </h2>
            
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
            
            {/* Brand Website Link */}
            <div className="flex justify-center mb-6">
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Official Website
              </a>
            </div>
            
            {/* Tabs */}
            <div className="flex justify-center space-x-2 mb-6 border-b border-gray-200">
              {['about', 'stats', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="min-h-[200px]">
              {/* About tab */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">{brand.name}</span> is a renowned brand in the {category} industry, 
                    established in {stats.founded}. Known for its quality products and innovation, {brand.name} has become 
                    a trusted name worldwide with presence in over {stats.countries} countries.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    With a commitment to excellence and customer satisfaction, {brand.name} continues to push boundaries 
                    in the {category} sector, offering cutting-edge solutions that combine style, functionality, and reliability.
                  </p>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Brand Mission</h4>
                    <p className="text-blue-700 text-sm">
                      To provide exceptional {category} solutions that enhance people's lives through innovation, 
                      quality, and sustainable practices.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Stats tab */}
              {activeTab === 'stats' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Founded</p>
                        <p className="font-medium text-gray-800">{stats.founded}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <Tag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Products</p>
                        <p className="font-medium text-gray-800">{stats.products}+</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Globe className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Countries</p>
                        <p className="font-medium text-gray-800">{stats.countries}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-100 rounded-full">
                        <Star className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="font-medium text-gray-800">{stats.rating}/5.0</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Timeline tab */}
              {activeTab === 'timeline' && (
                <div className="relative pl-8 space-y-8 before:absolute before:top-0 before:bottom-0 before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500">
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-blue-500 shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">{stats.founded}</h4>
                      <h3 className="font-medium text-gray-800">Brand Founded</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {brand.name} was established with a vision to revolutionize the {category} industry.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-indigo-500 shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">{stats.founded + 15}</h4>
                      <h3 className="font-medium text-gray-800">International Expansion</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Expanded operations to international markets, reaching new customers globally.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-purple-500 shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">{stats.founded + 30}</h4>
                      <h3 className="font-medium text-gray-800">Innovation Milestone</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Introduced groundbreaking technology that set new standards in the industry.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-pink-500 shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Present</h4>
                      <h3 className="font-medium text-gray-800">Industry Leader</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Now recognized as a leading brand in {stats.countries} countries with {stats.products}+ products.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-center pb-4">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-[-2px]"
                onClick={handleClose}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;