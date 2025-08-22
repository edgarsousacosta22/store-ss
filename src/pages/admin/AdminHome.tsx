import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingBag, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHome: React.FC = () => {
  const { products, reservations } = useAppContext();
  
  // Count statistics
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.available).length;
  const reservedProducts = totalProducts - availableProducts;
  
  const totalReservations = reservations.length;
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const completedReservations = reservations.filter(r => r.status === 'completed').length;
  const canceledReservations = reservations.filter(r => r.status === 'canceled').length;
  
  // Get recent reservations
  const recentReservations = [...reservations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Translate status to Portuguese
  const translateStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'Pendente',
      'confirmed': 'Confirmada',
      'canceled': 'Cancelada',
      'completed': 'Concluída'
    };
    return statusMap[status] || status;
  };
  
  // Get badge color based on status
  const getStatusBadgeClass = (status: string): string => {
    const statusClasses: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'canceled': 'bg-red-100 text-red-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total de Produtos</p>
              <p className="text-2xl font-semibold">{totalProducts}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className="text-green-600">{availableProducts} disponíveis</span>
            <span className="text-red-600">{reservedProducts} reservados</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total de Reservas</p>
              <p className="text-2xl font-semibold">{totalReservations}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <span className="text-yellow-600">{pendingReservations} pendentes</span>
            <span className="text-blue-600">{confirmedReservations} confirmadas</span>
            <span className="text-green-600">{completedReservations} concluídas</span>
            <span className="text-red-600">{canceledReservations} canceladas</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Reservas Pendentes</p>
              <p className="text-2xl font-semibold">{pendingReservations}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/reservas" 
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Ver todas as reservas →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Reservas Concluídas</p>
              <p className="text-2xl font-semibold">{completedReservations}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {(completedReservations / (totalReservations || 1) * 100).toFixed(0)}% de conversão
            </p>
          </div>
        </div>
      </div>
      
      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Reservas Recentes</h2>
        </div>
        <div className="p-6">
          {recentReservations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentReservations.map((reservation) => {
                const product = products.find(p => p.id === reservation.productId);
                
                return (
                  <div key={reservation.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {product && (
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{reservation.fullName}</p>
                        <p className="text-xs text-gray-500">
                          {product ? product.name : 'Produto não encontrado'} - {formatDate(reservation.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                      {translateStatus(reservation.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">Nenhuma reserva encontrada.</p>
          )}
          
          {recentReservations.length > 0 && (
            <div className="mt-4 text-center">
              <Link 
                to="/admin/reservas" 
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Ver todas as reservas
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;