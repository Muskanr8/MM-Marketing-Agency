import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import { setProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=8');
        dispatch(setProducts(response));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Furniture Shop</h1>
          <p className="text-lg mb-8">Discover premium furniture for your home</p>
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over ₹500</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here to help</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
