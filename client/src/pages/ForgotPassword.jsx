import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { showToast } from '../utils/toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      showToast('Check your email for reset instructions', 'success');
    } catch (error) {
      showToast(error.message || 'Error sending reset email', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-xl font-bold">Check Your Email</h2>
            <p className="text-gray-600">
              We've sent password reset instructions to {email}. Please check your inbox and spam folder.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Didn't receive an email? <button onClick={() => setSubmitted(false)} className="text-blue-600">Try again</button>
            </p>
            <Link to="/login" className="block text-blue-600 hover:text-blue-800 font-semibold mt-6">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p>Remember your password? <Link to="/login" className="text-blue-600 font-semibold">Login</Link></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
