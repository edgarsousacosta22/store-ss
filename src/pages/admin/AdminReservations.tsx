import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Check, X, Eye, Search } from 'lucide-react';

const AdminReservations: React.FC = () => {
  const { reservations, products, updateReservationStatus } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewingReservation, setViewingReservation] = useState<string | null>(null);
  
  // Get reservation with product information
  const getProductInfo = (productId: string) => {
    return products.find(p => p.id === productId) || null;
  };
  
  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = searchTerm === '' || 
      reservation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle status change
  const handleStatusChange = (reservationId: string, newStatus: 'pending' | 'confirmed' | 'canceled' | 'completed') => {
    if (window.confirm(`Tem certeza que deseja alterar o status para "${translateStatus(newStatus)}"?`)) {
      updateReservationStatus(reservationId, newStatus);
    }
  };
  
  // Translate status to Portuguese
  const translateStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'Pendente',
      'confirmed': 'Confirmada',
      'canceled': 'Cancelada',
      'completed': 'Concluída',
      'all': 'Todos'
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
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Reservas</h1>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Pesquisar</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, número ou email..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmada</option>
              <option value="canceled">Cancelada</option>
              <option value="completed">Concluída</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nº Reserva
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => {
              const product = getProductInfo(reservation.productId);
              
              return (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.reservationNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.fullName}</div>
                    <div className="text-sm text-gray-500">{reservation.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product && (
                        <>
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={product.imageUrl} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">€ {product.price.toFixed(2).replace('.', ',')}</div>
                          </div>
                        </>
                      )}
                      {!product && (
                        
                        <div className="text-sm text-gray-500">Produto não encontrado</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(reservation.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                      {translateStatus(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setViewingReservation(reservation.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {reservation.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900 mr-4"
                          title="Confirmar"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(reservation.id, 'canceled')}
                          className="text-red-600 hover:text-red-900"
                          title="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    
                    {reservation.status === 'confirmed' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(reservation.id, 'completed')}
                          className="text-green-600 hover:text-green-900 mr-4"
                          title="Concluir"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(reservation.id, 'canceled')}
                          className="text-red-600 hover:text-red-900"
                          title="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
            
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhuma reserva encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Reservation Details Modal */}
      {viewingReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const reservation = reservations.find(r => r.id === viewingReservation);
                const product = reservation ? getProductInfo(reservation.productId) : null;
                
                if (!reservation) {
                  return <p>Reserva não encontrada.</p>;
                }
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Detalhes da Reserva</h2>
                      <button 
                        onClick={() => setViewingReservation(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Reserva #{reservation.reservationNumber}
                        </h3>
                        <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                          {translateStatus(reservation.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Criada em {formatDate(reservation.createdAt)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-2">Informações do Cliente</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold">Nome:</span> {reservation.fullName}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold">Telefone:</span> {reservation.phone}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold">Email:</span> {reservation.email}
                        </p>
                        {reservation.girlfriendName && (
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold">Nome da Namorada:</span> {reservation.girlfriendName}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-2">Produto Reservado</h4>
                        {product ? (
                          <div className="flex">
                            <div className="h-16 w-16 rounded overflow-hidden">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-600">€ {product.price.toFixed(2).replace('.', ',')}</p>
                              {reservation.selectedSize && (
                                <p className="text-sm text-gray-600">
                                  Tamanho: {reservation.selectedSize}
                                </p>
                              )}
                              {reservation.selectedColor && (
                                <p className="text-sm text-gray-600">
                                  Cor: {reservation.selectedColor}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">Produto não encontrado</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setViewingReservation(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
                      >
                        Fechar
                      </button>
                      
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              handleStatusChange(reservation.id, 'confirmed');
                              setViewingReservation(null);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              handleStatusChange(reservation.id, 'canceled');
                              setViewingReservation(null);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      
                      {reservation.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => {
                              handleStatusChange(reservation.id, 'completed');
                              setViewingReservation(null);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                          >
                            Concluir
                          </button>
                          <button
                            onClick={() => {
                              handleStatusChange(reservation.id, 'canceled');
                              setViewingReservation(null);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;