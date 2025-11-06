import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { showToast } from '../utils/toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { ORDER_STATUS, PAYMENT_STATUS } from '../utils/constants';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.order);
        setLoading(false);
      } catch (error) {
        showToast('Order not found', 'error');
        navigate('/orders');
      }
    };
    fetchOrder();
  }, [id, token, navigate]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <div className="container py-12">Order not found</div>;

  return (
    <div className="container py-8">
      <button onClick={() => navigate('/orders')} className="text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Order #{order._id.slice(-8)}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Order Date</p>
                <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Order Status</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${ORDER_STATUS[order.orderStatus]?.color}`}>
                  {ORDER_STATUS[order.orderStatus]?.label}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Status</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${PAYMENT_STATUS[order.paymentStatus]?.color}`}>
                  {PAYMENT_STATUS[order.paymentStatus]?.label}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="font-bold text-lg">₹{order.totalAmount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}</p>
                    <p className="text-gray-600 text-sm">₹{(item.price * item.quantity).toFixed(0)} total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
            <div className="text-gray-700 space-y-1">
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
              <p>{order.shippingAddress?.postalCode}</p>
              <p>Phone: {order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg shadow p-6 h-fit space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-bold mb-3">Tracking</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5"></div>
                <div>
                  <p className="font-semibold">Order Placed</p>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${order.orderStatus !== 'pending' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-3 h-3 rounded-full mt-1.5 ${order.orderStatus !== 'pending' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-3 h-3 rounded-full mt-1.5 ${order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div>
                  <p className="font-semibold">Shipped</p>
                  <p className="text-sm text-gray-600">On the way</p>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${order.orderStatus === 'delivered' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-3 h-3 rounded-full mt-1.5 ${order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-sm text-gray-600">Expected soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
