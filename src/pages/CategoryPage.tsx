import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';
import { ChevronLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { gender, categoryName } = useParams<{ gender: string; categoryName: string }>();
  const { products } = useAppContext();
  
  // Format category and gender names
  const formatName = (name: string | undefined): string => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formattedGender = formatName(gender);
  const formattedCategory = formatName(categoryName);
  
  // Filter products by gender and category
  const filteredProducts = products.filter(p => 
    p.gender === gender && p.category === formattedCategory
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6 text-sm">
        <Link 
          to="/"
          className="text-gray-600 hover:text-purple-600"
        >
          Início
        </Link>
        <span className="text-gray-400">/</span>
        <Link 
          to={`/categoria/${gender}`}
          className="text-gray-600 hover:text-purple-600"
        >
          {formattedGender}
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-purple-600">{formattedCategory}</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {formattedCategory} - {formattedGender}
      </h1>
      
      <ProductGrid 
        products={filteredProducts} 
      />
    </div>
  );
};

export default CategoryPage;