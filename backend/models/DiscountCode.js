import mongoose from "mongoose";

const DiscountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  expiresAt: { type: Date },
});

export default mongoose.model("DiscountCode", DiscountCodeSchema);
