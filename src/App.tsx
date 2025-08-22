import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminProducts from './pages/admin/AdminProducts';
import AdminReservations from './pages/admin/AdminReservations';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="reservas" element={<AdminReservations />} />
          </Route>
          
          {/* Login Route */}
          <Route path="/admin-login" element={<LoginPage />} />
          
          {/* Customer Routes */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <div className="min-h-[calc(100vh-64px-300px)]">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produto/:productId" element={<ProductDetailPage />} />
                    <Route path="/categoria/:gender/:categoryName" element={<CategoryPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;