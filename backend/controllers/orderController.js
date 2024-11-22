// controllers/orderController.js
import "dotenv/config";
import Stripe from "stripe";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Order
export const createOrder = async (req, res) => {
  const { shippingAddress, shippingMethod, paymentIntentId, shippingCost } =
    req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!paymentIntentId) {
      return res.status(400).json({ message: "Payment Intent ID is required" });
    }

    // Validate shippingAddress
    const requiredFields = [
      "fullName",
      "addressLine1",
      "city",
      "state",
      "zipCode",
      "country",
      "phoneNumber",
    ];
    for (const field of requiredFields) {
      if (!shippingAddress[field] || !shippingAddress[field].trim()) {
        return res
          .status(400)
          .json({ message: `${field} is required in shipping address` });
      }
    }

    // Retrieve the payment intent to verify its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const totalAmount = paymentIntent.amount_received / 100;

    // Create Order
    const order = new Order({
      userId: req.user.id,
      products: cart.products,
      totalAmount,
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentStatus: "Paid",
    });
    await order.save();

    // Clear the cart
    cart.products = [];
    await cart.save();

    // Send Email Confirmation
    const user = await User.findById(req.user.id);
    if (user && user.email) {
      sendOrderConfirmationEmail(user.email, order);
    }

    res.json(order);
  } catch (err) {
    console.error("Create Order Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Get Orders for User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("products.productId");
    res.json(orders);
  } catch (err) {
    console.error("Get Orders Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Request Order Cancellation
export const requestOrderCancellation = async (req, res) => {
  const orderId = req.params.id;
  try {
    // Find the order by ID and ensure it belongs to the user
    const order = await Order.findOne({ _id: orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order is eligible for cancellation
    if (
      order.orderStatus === "Cancelled" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    // Update the order status
    order.orderStatus = "Cancellation Requested";
    order.cancellationRequested = true;
    await order.save();

    // Optionally, send an email notification to the admin or user
    // sendCancellationRequestEmail(order);

    res.json({ message: "Cancellation request submitted successfully" });
  } catch (err) {
    console.error("Order Cancellation Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Send Order Confirmation Email
function sendOrderConfirmationEmail(email, order) {
  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"AMPES" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Order Confirmation",
    text: `Thank you for your purchase! Your order ID is ${order._id}.`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <p>Your order ID is <strong>${order._id}</strong>.</p>
      <h2>Order Details:</h2>
      <ul>
        ${order.products
          .map(
            (item) => `
          <li>
            ${item.productId.name} - Size: ${item.size} - Quantity: ${
              item.quantity
            } - Price: $${(item.productId.price * item.quantity).toFixed(2)}
          </li>
        `
          )
          .join("")}
      </ul>
      <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
      <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
      <p><strong>Shipping Address:</strong></p>
      <p>
        ${order.shippingAddress.fullName}<br />
        ${order.shippingAddress.addressLine1}<br />
        ${
          order.shippingAddress.addressLine2
            ? order.shippingAddress.addressLine2 + "<br />"
            : ""
        }
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${
      order.shippingAddress.zipCode
    }<br />
        ${order.shippingAddress.country}<br />
        Phone: ${order.shippingAddress.phoneNumber}
      </p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Export controller functions
export default {
  createOrder,
  getUserOrders,
  requestOrderCancellation,
  // ... other exports if needed ...
};
