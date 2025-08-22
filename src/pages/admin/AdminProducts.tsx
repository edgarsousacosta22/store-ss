import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const initialProductState: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: 'Vestidos',
    gender: 'mulher',
    available: true,
    sizes: ['P', 'M', 'G'],
    colors: ['Preto']
  };

  const categories = {
    homem: ['Camisas', 'Calças', 'Blazers', 'Pijamas', 'Roupa Íntima', 'Calçado'],
    mulher: ['Vestidos', 'Blusas', 'Saias', 'Calças', 'Pijamas', 'Roupa Íntima', 'Calçado'],
    jovens: ['Camisas', 'Calças', 'Vestidos', 'Pijamas', 'Roupa Íntima', 'Calçado']
  };
  
  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsCreating(false);
  };
  
  const handleCreateClick = () => {
    setCurrentProduct(initialProductState);
    setIsCreating(true);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setCurrentProduct(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'price') {
      const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue
      }));
    } else if (name === 'available' && type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: target.checked
      }));
    } else if (name === 'sizes' || name === 'colors') {
      const values = value.split(',').map(item => item.trim());
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: values
      }));
    } else if (name === 'gender') {
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: value,
        category: categories[value as keyof typeof categories][0]
      }));
    } else {
      setCurrentProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    if (isCreating) {
      const newProduct: Product = {
        ...initialProductState,
        ...currentProduct,
        id: Math.random().toString(36).substring(2, 11)
      } as Product;
      
      addProduct(newProduct);
    } else if (isEditing && currentProduct.id) {
      updateProduct(currentProduct.id, currentProduct);
    }
    
    setIsEditing(false);
    setIsCreating(false);
    setCurrentProduct(null);
  };
  
  const handleDelete = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(productId);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Produtos</h1>
        
        <button
          onClick={handleCreateClick}
          className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-purple-700 transition duration-300"
        >
          <Plus size={18} className="mr-2" />
          Novo Produto
        </button>
      </div>
      
      {(isEditing || isCreating) && currentProduct && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isCreating ? 'Criar Novo Produto' : 'Editar Produto'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Preço (€)</label>
                <input
                  type="text"
                  name="price"
                  value={currentProduct.price?.toFixed(2).replace('.', ',') || '0,00'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={currentProduct.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">URL da Imagem</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={currentProduct.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gênero</label>
                <select
                  name="gender"
                  value={currentProduct.gender || 'mulher'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="homem">Homem</option>
                  <option value="mulher">Mulher</option>
                  <option value="jovens">Jovens</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Categoria</label>
                <select
                  name="category"
                  value={currentProduct.category || categories[currentProduct.gender || 'mulher'][0]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currentProduct.gender && categories[currentProduct.gender].map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Tamanhos (separados por vírgula)</label>
                <input
                  type="text"
                  name="sizes"
                  value={currentProduct.sizes?.join(', ') || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Cores (separadas por vírgula)</label>
                <input
                  type="text"
                  name="colors"
                  value={currentProduct.colors?.join(', ') || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    name="available"
                    checked={currentProduct.available || false}
                    onChange={handleInputChange}
                    className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-500 rounded"
                  />
                  Disponível para reserva
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300 flex items-center"
              >
                <X size={18} className="mr-2" />
                Cancelar
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300 flex items-center"
              >
                <Check size={18} className="mr-2" />
                {isCreating ? 'Criar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gênero
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={product.imageUrl} 
                        alt={product.name} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">{product.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">€ {product.price.toFixed(2).replace('.', ',')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? 'Disponível' : 'Reservado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEditClick(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;