import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { showToast } from '../utils/toast';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span>🛋️</span>
          Furniture Shop
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-100">Home</Link>
          <Link to="/products" className="hover:text-blue-100">Products</Link>
          <Link to="/cart" className="hover:text-blue-100 relative">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          {token && <Link to="/wishlist" className="hover:text-blue-100">Wishlist</Link>}
          {token && <Link to="/orders" className="hover:text-blue-100">Orders</Link>}
          {user?.role === 'admin' && <Link to="/admin" className="hover:text-blue-100">Admin</Link>}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <span className="text-sm">{user?.name}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-100">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-blue-700 md:hidden p-4 space-y-2">
            <Link to="/" className="block hover:text-blue-200">Home</Link>
            <Link to="/products" className="block hover:text-blue-200">Products</Link>
            <Link to="/cart" className="block hover:text-blue-200">Cart ({cartItems.length})</Link>
            {token && <Link to="/wishlist" className="block hover:text-blue-200">Wishlist</Link>}
            {token && <Link to="/orders" className="block hover:text-blue-200">Orders</Link>}
            {user?.role === 'admin' && <Link to="/admin" className="block hover:text-blue-200">Admin</Link>}
            {token ? (
              <button onClick={handleLogout} className="block w-full text-left hover:text-blue-200">
                Logout ({user?.name})
              </button>
            ) : (
              <>
                <Link to="/login" className="block hover:text-blue-200">Login</Link>
                <Link to="/register" className="block hover:text-blue-200">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
