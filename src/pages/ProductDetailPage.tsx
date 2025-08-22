import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ReservationForm from '../components/ReservationForm';
import { ChevronLeft, Check } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useAppContext();
  const navigate = useNavigate();
  
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Produto não encontrado</h2>
        <p className="text-gray-600 mb-8">O produto que você está procurando não existe ou foi removido.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300"
        >
          <ChevronLeft size={20} className="mr-2" />
          Voltar para a loja
        </button>
      </div>
    );
  }
  
  const handleReservationSuccess = (reservationNumber: string) => {
    setReservationNumber(reservationNumber);
    setReservationSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-purple-600 hover:text-purple-700 transition duration-300"
        >
          <ChevronLeft size={18} className="mr-1" />
          Voltar
        </button>
      </div>
      
      {/* Success Message */}
      {reservationSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-start">
          <div className="bg-green-500 rounded-full p-1 mr-4 flex-shrink-0">
            <Check size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Reserva confirmada!</h3>
            <p className="text-green-700 mb-2">
              Sua reserva foi confirmada com sucesso. Anote seu número de reserva:
            </p>
            <p className="text-xl font-bold text-green-900 mb-4">{reservationNumber}</p>
            <p className="text-sm text-green-700">
              Por favor, apresente o número de reserva na loja para retirar o produto. 
              A reserva é válida por 48 horas.
            </p>
          </div>
        </div>
      )}
      
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="p-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
              {product.available ? (
                <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Disponível
                </span>
              ) : (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Reservado
                </span>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-purple-600 mb-4">
              € {product.price.toFixed(2).replace('.', ',')}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Descrição</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Tamanhos</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <span key={size} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Cores</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <span key={color} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Categoria</h2>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reservation Form */}
      <div className="mt-8">
        {!reservationSuccess && (
          <ReservationForm 
            product={product} 
            onSuccess={handleReservationSuccess} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;