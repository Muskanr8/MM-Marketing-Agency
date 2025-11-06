import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';
import { showToast } from '../utils/toast';
import api from '../utils/api';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.products);
  const [loading, setLoading] = useState(false);
  const isInWishlist = wishlist.some(p => p._id === product._id);

  const handleAddToCart = async () => {
    if (!token) {
      showToast('Please login to add items to cart', 'warning');
      return;
    }
    setLoading(true);
    try {
      await api.post('/cart', { productId: product._id, quantity: 1 });
      dispatch(addToCart({ productId: product._id, quantity: 1, price: product.price }));
      showToast('Added to cart', 'success');
    } catch (error) {
      showToast(error.message || 'Error adding to cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      showToast('Please login to use wishlist', 'warning');
      return;
    }
    try {
      if (isInWishlist) {
        await api.delete(`/wishlist/${product._id}`);
        dispatch(removeFromWishlist(product._id));
        showToast('Removed from wishlist', 'info');
      } else {
        await api.post('/wishlist', { productId: product._id });
        dispatch(addToWishlist(product));
        showToast('Added to wishlist', 'success');
      }
    } catch (error) {
      showToast(error.message || 'Error updating wishlist', 'error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden bg-gray-100 h-48">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{product.discount}%
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{Math.round(product.price / (1 - product.discount / 100))}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded font-semibold transition"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button
            onClick={handleWishlist}
            className={`px-4 py-2 rounded font-semibold transition ${
              isInWishlist
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>

        {product.ratings && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600">{product.ratings.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
