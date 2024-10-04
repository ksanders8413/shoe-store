import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  baseCost: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  customCosts: [
    {
      description: String,
      amount: Number,
    },
  ],
  totalCost: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('ProductCost', ProductSchema);
