// models/Order.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products:        [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity:  { type: Number },
      size:      { type: String },
    },
  ],
  totalAmount:     { type: Number },
  shippingAddress: { type: Object },
  shippingMethod:  { type: String },
  shippingCost:    { type: Number },
  paymentStatus:   { type: String },
  orderStatus:     { type: String, default: 'Pending' }, // Possible values: 'Pending', 'Shipped', 'Delivered', 'Cancelled', 'Cancellation Requested'
  cancellationRequested: { type: Boolean, default: false }, // New field
  createdAt:       { type: Date, default: Date.now },
});

export default mongoose.model('Order', OrderSchema);
