import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';
import { showToast } from '../utils/toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.products);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.product);
        setLoading(false);
      } catch (error) {
        showToast('Product not found', 'error');
        navigate('/products');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const isInWishlist = product && wishlist.some(p => p._id === product._id);

  const handleAddToCart = async () => {
    if (!token) {
      showToast('Please login to add items to cart', 'warning');
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', { productId: product._id, quantity });
      dispatch(addToCart({ productId: product._id, quantity, price: product.price }));
      showToast('Added to cart', 'success');
    } catch (error) {
      showToast(error.message || 'Error adding to cart', 'error');
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      showToast('Please login to use wishlist', 'warning');
      navigate('/login');
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

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="container py-12">Product not found</div>;

  return (
    <div className="container py-8">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 mb-6">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
            {product.images?.[selectedImage]?.url ? (
              <img
                src={product.images[selectedImage].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
                    selectedImage === idx ? 'border-blue-600' : 'border-gray-300'
                  }`}
                >
                  <img src={img.url} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="ml-4 text-lg text-gray-500 line-through">
                ₹{Math.round(product.price / (1 - product.discount / 100))}
              </span>
            )}
            {product.discount > 0 && (
              <span className="ml-4 text-lg font-bold text-red-600">-{product.discount}% off</span>
            )}
          </div>

          <div className="mb-6 space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Stock:</span>{' '}
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
              </span>
            </p>
            {product.ratings && (
              <p className="text-gray-700">
                <span className="font-semibold">Rating:</span> ⭐ {product.ratings.toFixed(1)}
              </p>
            )}
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  isInWishlist
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isInWishlist ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="flex items-center gap-2"><span>✓</span> Free shipping on orders over ₹500</p>
            <p className="flex items-center gap-2"><span>✓</span> Easy returns within 30 days</p>
            <p className="flex items-center gap-2"><span>✓</span> Secure payment</p>
            <p className="flex items-center gap-2"><span>✓</span> 24/7 customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
