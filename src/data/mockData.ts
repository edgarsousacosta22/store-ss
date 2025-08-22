import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Floral Verão',
    description: 'Vestido floral perfeito para o verão, com tecido leve e design elegante.',
    price: 159.90,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Vestidos',
    gender: 'mulher',
    available: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Azul', 'Rosa', 'Verde']
  },
  {
    id: '2',
    name: 'Camisa Social Masculina',
    description: 'Camisa social de alta qualidade, ideal para ocasiões formais e ambiente de trabalho.',
    price: 129.90,
    imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Camisas',
    gender: 'homem',
    available: true,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Azul', 'Preto']
  },
  {
    id: '3',
    name: 'Calça Jeans Skinny',
    description: 'Calça jeans skinny com lavagem moderna e corte perfeito para todos os tipos de corpo.',
    price: 179.90,
    imageUrl: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Calças',
    gender: 'jovens',
    available: true,
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Azul Claro', 'Azul Escuro']
  },
  {
    id: '4',
    name: 'Pijama de Algodão',
    description: 'Pijama confortável feito de algodão puro, perfeito para uma boa noite de sono.',
    price: 89.90,
    imageUrl: 'https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Pijamas',
    gender: 'mulher',
    available: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Azul', 'Cinza']
  },
  {
    id: '5',
    name: 'Tênis Casual',
    description: 'Tênis casual versátil, combina com diversos looks.',
    price: 149.90,
    imageUrl: 'https://images.pexels.com/photos/6765029/pexels-photo-6765029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Calçado',
    gender: 'jovens',
    available: true,
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['Preto', 'Branco', 'Cinza']
  },
  {
    id: '6',
    name: 'Conjunto de Roupa Íntima',
    description: 'Conjunto de roupa íntima confortável e elegante.',
    price: 79.90,
    imageUrl: 'https://images.pexels.com/photos/6765027/pexels-photo-6765027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Roupa Íntima',
    gender: 'mulher',
    available: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Branco', 'Rosa']
  }
];