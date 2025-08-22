import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';
import { Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) || 
        product.description.toLowerCase().includes(lowercaseSearch) ||
        product.category.toLowerCase().includes(lowercaseSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-600/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
        ></div>
        
        <div className="relative z-20 py-16 px-6 md:px-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Seu estilo, sua reserva
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            Explore nossa coleção exclusiva e reserve peças únicas para experimentar e garantir seu estilo perfeito.
          </p>
          <a 
            href="#produtos"
            className="inline-block bg-white text-purple-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
          >
            Ver Catálogo
          </a>
        </div>
      </section>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      {/* Category Sections */}
      <div id="produtos">
        {searchTerm ? (
          <ProductGrid 
            products={filteredProducts} 
            title={`Resultados para "${searchTerm}" (${filteredProducts.length})`} 
          />
        ) : (
          <>
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category);
              return (
                <ProductGrid 
                  key={category} 
                  products={categoryProducts} 
                  title={category} 
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;