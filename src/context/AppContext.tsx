import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, Reservation, User } from '../types';
import { mockProducts } from '../data/mockData';

interface AppContextProps {
  products: Product[];
  reservations: Reservation[];
  user: User;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>) => string;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  login: (isAdmin: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [user, setUser] = useState<User>({ isAdmin: false });

  // Initialize with mock data
  useEffect(() => {
    setProducts(mockProducts);
    // Load from localStorage if available
    const savedReservations = localStorage.getItem('reservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  // Save reservations to localStorage when updated
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const generateReservationNumber = () => {
    return `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const addReservation = (
    newReservation: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>
  ) => {
    const product = products.find(p => p.id === newReservation.productId);
    
    if (!product || !product.available) {
      throw new Error('Produto não disponível para reserva!');
    }
    
    const reservationNumber = generateReservationNumber();
    const reservation: Reservation = {
      ...newReservation,
      id: Math.random().toString(36).substring(2, 11),
      reservationNumber,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setReservations([...reservations, reservation]);
    updateProduct(product.id, { available: false });
    
    return reservationNumber;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );

    // If canceled, make product available again
    if (status === 'canceled') {
      const reservation = reservations.find(r => r.id === id);
      if (reservation) {
        updateProduct(reservation.productId, { available: true });
      }
    }
  };

  const login = (isAdmin: boolean) => {
    setUser({ isAdmin });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        reservations,
        user,
        addProduct,
        updateProduct,
        deleteProduct,
        addReservation,
        updateReservationStatus,
        login
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};