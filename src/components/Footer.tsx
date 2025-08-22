import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">STORE<span className="text-purple-400">-SS</span></h3>
            <p className="text-gray-300 mb-4">
              Sua plataforma para reserva de roupas exclusivas com atendimento personalizado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-purple-400" />
                <span className="text-gray-300">Rua Duarte de Oliveira 470b</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-purple-400" />
                <span className="text-gray-300">937558963</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-purple-400" />
                <span className="text-gray-300">geral@store-ss.pt</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} STORE-SS. Desenvolvido por <a href="https://webminds.pt" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Webminds Solutions</a></p>
          <Link to="/admin-login" className="text-gray-500 hover:text-gray-400 text-xs mt-2 inline-block">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;