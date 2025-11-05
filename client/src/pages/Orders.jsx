import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { setOrders } from '../slices/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        try {
          const response = await api.get('/orders');
          dispatch(setOrders(response.orders));
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [dispatch, token]);

  if (!token) {
    return (
      <div className="container py-12 text-center">
        <p className="mb-4">Please login to view your orders</p>
        <Link to="/login" className="btn-primary">Go to Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl mb-4">No orders yet</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-semibold">₹{order.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${
                  order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.orderStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment</p>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${
                  order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div>
                <Link to={`/order/${order._id}`} className="btn-primary text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
