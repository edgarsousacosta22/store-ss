import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppContext();

  const categories = {
    homem: {
      label: 'Homem',
      subcategories: [
        { name: 'Camisas', path: '/categoria/homem/camisas' },
        { name: 'Calças', path: '/categoria/homem/calcas' },
        { name: 'Blazers', path: '/categoria/homem/blazers' },
        { name: 'Pijamas', path: '/categoria/homem/pijamas' },
        { name: 'Roupa Íntima', path: '/categoria/homem/roupa-intima' },
        { name: 'Calçado', path: '/categoria/homem/calcado' }
      ]
    },
    mulher: {
      label: 'Mulher',
      subcategories: [
        { name: 'Vestidos', path: '/categoria/mulher/vestidos' },
        { name: 'Blusas', path: '/categoria/mulher/blusas' },
        { name: 'Saias', path: '/categoria/mulher/saias' },
        { name: 'Calças', path: '/categoria/mulher/calcas' },
        { name: 'Pijamas', path: '/categoria/mulher/pijamas' },
        { name: 'Roupa Íntima', path: '/categoria/mulher/roupa-intima' },
        { name: 'Calçado', path: '/categoria/mulher/calcado' }
      ]
    },
    jovens: {
      label: 'Jovens',
      subcategories: [
        { name: 'Camisas', path: '/categoria/jovens/camisas' },
        { name: 'Calças', path: '/categoria/jovens/calcas' },
        { name: 'Vestidos', path: '/categoria/jovens/vestidos' },
        { name: 'Pijamas', path: '/categoria/jovens/pijamas' },
        { name: 'Roupa Íntima', path: '/categoria/jovens/roupa-intima' },
        { name: 'Calçado', path: '/categoria/jovens/calcado' }
      ]
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="font-bold text-2xl text-gray-800 hover:text-gray-600 transition duration-300"
          >
            STORE<span className="text-purple-600">-SS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition duration-300">
              Início
            </Link>
            
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="relative group">
                <button className="text-gray-700 hover:text-purple-600 transition duration-300 flex items-center">
                  {category.label}
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block transition-all duration-300 py-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.path}
                      to={subcategory.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            <Link to="/contato" className="text-gray-700 hover:text-purple-600 transition duration-300">
              Contato
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-purple-600 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              
              {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <span className="text-gray-700 font-medium block">{category.label}</span>
                  <div className="ml-4 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.path}
                        to={subcategory.path}
                        className="block text-gray-600 hover:text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <Link 
                to="/contato" 
                className="text-gray-700 hover:text-purple-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;