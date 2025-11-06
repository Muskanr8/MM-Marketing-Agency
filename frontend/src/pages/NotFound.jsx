import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-20 text-center">
      <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/products" className="btn-secondary">Browse Products</Link>
      </div>
    </div>
  );
};

export default NotFound;
