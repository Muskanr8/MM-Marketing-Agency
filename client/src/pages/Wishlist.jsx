import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { setWishlist, removeFromWishlist } from '../slices/wishlistSlice';
import ProductCard from '../components/Header';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const fetchWishlist = async () => {
        try {
          const response = await api.get('/wishlist');
          dispatch(setWishlist(response.wishlist));
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
      fetchWishlist();
    }
  }, [dispatch, token]);

  if (!token) {
    return (
      <div className="container py-12 text-center">
        <p className="mb-4">Please login to view your wishlist</p>
        <Link to="/login" className="btn-primary">Go to Login</Link>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl mb-4">Your wishlist is empty</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
