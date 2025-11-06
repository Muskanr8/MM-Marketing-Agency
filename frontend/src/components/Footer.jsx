import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Furniture Shop</h3>
            <p className="text-gray-400">Quality furniture for your home at the best prices.</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#sofa" className="hover:text-white">Sofas</a></li>
              <li><a href="#bed" className="hover:text-white">Beds</a></li>
              <li><a href="#dining" className="hover:text-white">Dining</a></li>
              <li><a href="#chair" className="hover:text-white">Chairs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#help" className="hover:text-white">Help Center</a></li>
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 Furniture Shop. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#facebook" className="hover:text-white">Facebook</a>
            <a href="#twitter" className="hover:text-white">Twitter</a>
            <a href="#instagram" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
