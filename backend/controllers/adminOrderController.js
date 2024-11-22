// controllers/adminOrderController.js
import Order from '../models/Order.js';
import json2csv from 'json2csv';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.json(orders);
  } catch (err) {
    console.error('Get All Orders Error:', err.message);
    res.status(500).send('Server Error');
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error('Update Order Status Error:', err.message);
    res.status(500).send('Server Error');
  }
};

export const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    const fields = ['_id', 'userId.email', 'totalAmount', 'orderStatus', 'createdAt'];
    const csv = json2csv.parse(orders, { fields });

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  } catch (err) {
    console.error('Export Orders Error:', err.message);
    res.status(500).send('Server Error');
  }
};
