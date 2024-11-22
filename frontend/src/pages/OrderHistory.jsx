// src/pages/OrderHistory.jsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, []);

  const requestCancellation = async (orderId) => {
    try {
      const response = await axios.post(`/orders/${orderId}/cancel`);
      alert(response.data.message);
      // Refresh orders to reflect the updated status
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: 'Cancellation Requested', cancellationRequested: true } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error requesting order cancellation:', error);
      alert(error.response?.data?.message || 'Failed to request cancellation');
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-8 font-serif">Your Orders</h1>
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 font-serif">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="mb-8 border p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
          <p className="mb-2">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="mb-2">Total Amount: ${order.totalAmount.toFixed(2)}</p>
          <p className="mb-2">Order Status: {order.orderStatus}</p>
          <h3 className="text-lg font-bold mt-4">Items:</h3>
          <ul className="list-disc list-inside">
            {order.products.map((item) => (
              <li key={`${item.productId._id}-${item.size}-${item.quantity}`}>
                {item.productId.name} - Size: {item.size} - Quantity: {item.quantity} - Price: $
                {item.productId.price.toFixed(2)}
              </li>
            ))}
          </ul>
          {/* Request Cancellation Button */}
          {order.orderStatus !== 'Cancelled' &&
            order.orderStatus !== 'Delivered' &&
            order.orderStatus !== 'Cancellation Requested' && (
              <button
                onClick={() => requestCancellation(order._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Request Cancellation
              </button>
            )}
          {order.orderStatus === 'Cancellation Requested' && (
            <p className="mt-4 text-yellow-600 font-bold">Cancellation Requested</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
