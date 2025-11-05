import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setCart, removeFromCart, updateCartItem, clearCart } from '../slices/cartSlice';
import { showToast } from '../utils/toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const fetchCart = async () => {
        try {
          const response = await api.get('/cart');
          dispatch(setCart(response.cart));
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }
  }, [dispatch, token]);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      dispatch(removeFromCart(productId));
      showToast('Product removed from cart', 'success');
    } catch (error) {
      showToast(error.message || 'Error removing product', 'error');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await api.put('/cart', { productId, quantity });
      dispatch(updateCartItem({ productId, quantity }));
    } catch (error) {
      showToast(error.message || 'Error updating cart', 'error');
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  if (!token) {
    return (
      <div className="container py-12 text-center">
        <p className="mb-4">Please login to view your cart</p>
        <Link to="/login" className="btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div key={item.productId} className="border-b p-4 flex gap-4">
                {item.productId?.images?.[0]?.url && (
                  <img
                    src={item.productId.images[0].url}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productId?.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{(item.price * item.quantity).toFixed(0)}</p>
                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="text-red-600 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
