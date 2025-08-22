import React, { useState } from 'react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ReservationFormProps {
  product: Product;
  onSuccess: (reservationNumber: string) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ product, onSuccess }) => {
  const { addReservation } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    selectedSize: product.sizes[0],
    selectedColor: product.colors[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Nome completo é obrigatório';
    if (!formData.phone.trim()) return 'Telemóvel é obrigatório';
    if (!formData.address.trim()) return 'Morada é obrigatória';
    if (!formData.email.trim()) return 'Email é obrigatório';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Email inválido';
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (!product.available) {
        throw new Error('Este produto não está mais disponível para reserva.');
      }
      
      const reservationNumber = addReservation({
        productId: product.id,
        fullName: formData.fullName,
        phone: formData.phone,
        girlfriendName: formData.address, // Keep the field name for backend compatibility
        email: formData.email,
        selectedSize: formData.selectedSize,
        selectedColor: formData.selectedColor
      });
      
      onSuccess(reservationNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua reserva.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Faça sua Reserva</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
          Nome Completo*
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
          Telemóvel*
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
          Morada*
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="selectedSize" className="block text-gray-700 font-medium mb-2">
            Tamanho
          </label>
          <select
            id="selectedSize"
            name="selectedSize"
            value={formData.selectedSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {product.sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="selectedColor" className="block text-gray-700 font-medium mb-2">
            Cor
          </label>
          <select
            id="selectedColor"
            name="selectedColor"
            value={formData.selectedColor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {product.colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || !product.available}
        className={`w-full py-3 px-4 text-white font-medium rounded-md transition duration-300 ${
          product.available
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Processando...' : (product.available ? 'Confirmar Reserva' : 'Produto Indisponível')}
      </button>
      
      <p className="text-sm text-gray-500 mt-4">
        * Campos obrigatórios
      </p>
    </form>
  );
};

export default ReservationForm;