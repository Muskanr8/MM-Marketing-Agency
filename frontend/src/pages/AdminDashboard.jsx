import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchDashboard = async () => {
        try {
          const response = await api.get('/admin/dashboard');
          setDashboard(response.dashboard);
        } catch (error) {
          console.error('Error fetching dashboard:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchDashboard();
    }
  }, [token]);

  if (loading) return <div className="container py-12">Loading...</div>;

  if (!dashboard) return <div className="container py-12">Failed to load dashboard</div>;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-3xl font-bold">{dashboard.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-3xl font-bold">{dashboard.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold">{dashboard.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold">₹{dashboard.totalRevenue}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentOrders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">{order._id.slice(-6)}</td>
                  <td className="py-2">{order.userId.name}</td>
                  <td className="py-2">₹{order.totalAmount}</td>
                  <td className="py-2">{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
