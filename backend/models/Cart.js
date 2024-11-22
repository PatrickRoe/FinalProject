// models/Cart.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity:  { type: Number, default: 1 },
      size:      { type: String },
    },
  ],
});

export default mongoose.model('Cart', CartSchema);
