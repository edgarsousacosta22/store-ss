export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  gender: 'homem' | 'mulher' | 'jovens';
  available: boolean;
  sizes: string[];
  colors: string[];
}

export interface Reservation {
  id: string;
  productId: string;
  fullName: string;
  phone: string;
  girlfriendName: string;
  email: string;
  reservationNumber: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  isAdmin: boolean;
}