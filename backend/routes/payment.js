// routes/payment.js

import express from 'express';
import Stripe from 'stripe';
import authMiddleware from '../middleware/authMiddleware.js';
import Cart from '../models/Cart.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route to create a payment intent
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  try {
    const { shippingCost } = req.body; // Get shippingCost from request body

    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const cartTotal = cart.products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const totalAmount = cartTotal + shippingCost;

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error('Create Payment Intent Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
