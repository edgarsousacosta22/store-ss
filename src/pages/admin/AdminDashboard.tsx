import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Package, ClipboardList, LayoutDashboard, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { user, login } = useAppContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Redirect if not admin
  if (!user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  // Determine active route
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = () => {
    login(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Admin Dashboard</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 space-y-2">
            <Link
              to="/admin"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive('/admin') && location.pathname === '/admin'
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={20} className="mr-3" />
              Dashboard
            </Link>
            
            <Link
              to="/admin/produtos"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive('/admin/produtos')
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Package size={20} className="mr-3" />
              Produtos
            </Link>
            
            <Link
              to="/admin/reservas"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive('/admin/reservas')
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ClipboardList size={20} className="mr-3" />
              Reservas
            </Link>
            
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 w-full text-left"
            >
              <LogOut size={20} className="mr-3" />
              Sair
            </button>
          </nav>
        )}
      </div>
      
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-gray-900 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 py-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          
          <div className="flex-grow flex flex-col py-4">
            <nav className="flex-1 px-2 space-y-2">
              <Link
                to="/admin"
                className={`flex items-center px-4 py-3 rounded-md ${
                  isActive('/admin') && location.pathname === '/admin'
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <LayoutDashboard size={20} className="mr-3" />
                Dashboard
              </Link>
              
              <Link
                to="/admin/produtos"
                className={`flex items-center px-4 py-3 rounded-md ${
                  isActive('/admin/produtos')
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Package size={20} className="mr-3" />
                Produtos
              </Link>
              
              <Link
                to="/admin/reservas"
                className={`flex items-center px-4 py-3 rounded-md ${
                  isActive('/admin/reservas')
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <ClipboardList size={20} className="mr-3" />
                Reservas
              </Link>
            </nav>
          </div>
          
          <div className="flex-shrink-0 px-2 pb-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800"
            >
              <LogOut size={20} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="md:ml-64 flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;