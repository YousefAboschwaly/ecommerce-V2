import React, { useState } from 'react';
import BrandCard from './BrandCard';
import BrandModal from './BrandModal';
import { Search } from 'lucide-react';
import { IBrand } from '@/interfaces';

interface BrandGridProps {
  brands: IBrand[];
}

const BrandGrid: React.FC<BrandGridProps> = ({ brands }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);

  const categories = [
    { id: 'all', name: 'All Brands' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty' },
  ];

  // Categorize brands (in a real app, this would come from the API)
  const getBrandCategory = (brand: IBrand): string => {
    const electronics = ['Apple', 'Samsung', 'Sony', 'Dell', 'Lenovo', 'Canon', 'Huawei', 'Xiaomi', 'Oppo', 'Nokia', 'Realme', 'Infinix', 'Toshiba', 'Philips', 'Tornado', 'Fresh', 'Beko', 'Kenwood'];
    const fashion = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Reserved', 'Skechers', 'LC Waikiki', 'Jack & Jones', 'DeFacto', 'Andora'];
    const beauty = ['Maybelline', 'Loreal', 'Calvin Klein', 'Carolina Herrera', 'Kemei', 'Bourjois', 'Essence', 'Garnier', 'Braun'];

    if (electronics.includes(brand.name)) return 'electronics';
    if (fashion.includes(brand.name)) return 'fashion';
    if (beauty.includes(brand.name)) return 'beauty';
    return 'other';
  };
  console.log('brands',brands)
  
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || getBrandCategory(brand) === category;
    return matchesSearch && matchesCategory;
  });
  console.log('filteredBrands',filteredBrands)

  const handleBrandClick = (brand: IBrand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search brands..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${category === cat.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              style={{
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                transform: 'translateY(10px)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand, index) => (
            <BrandCard 
              key={brand._id} 
              brand={brand} 
              index={index} 
              onClick={handleBrandClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No brands found matching your search</h3>
        </div>
      )}

      {selectedBrand && (
        <BrandModal brand={selectedBrand} onClose={closeModal} category={getBrandCategory(selectedBrand)} />
      )}
    </div>
  );
};

export default BrandGrid;