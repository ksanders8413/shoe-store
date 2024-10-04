import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sizes: [
      {
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        size: {
          // Renamed from sizes to size for clarity
          type: Number,
          required: true,
          // default: [], 
        },
      },
    ],
    images: {
      type: [String],
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
