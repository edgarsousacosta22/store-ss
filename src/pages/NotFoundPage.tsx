import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px-300px)] bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-600 mb-4">
            Lamentamos, mas a página que procura não existe ou foi removida.
          </p>
          <p className="text-gray-600">
            Por favor, verifique o endereço ou utilize os botões abaixo para navegar no site.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            <Home size={20} className="mr-2" />
            Página Inicial
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;