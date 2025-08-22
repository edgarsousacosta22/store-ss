import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          {product.available ? (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Disponível
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Reservado
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            € {product.price.toFixed(2).replace('.', ',')}
          </span>
          
          <Link
            to={`/produto/${product.id}`}
            className="bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;