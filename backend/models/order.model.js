import mongoose from "mongoose";
import moment from "moment-timezone";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        size: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
    },
    stripeSessionId: {
      type: String,
      unique: true,
      required: true,
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      default: () => moment.tz("America/Chicago").toDate(),
    },
    updatedAt: {
      type: Date,
      default: () => moment.tz("America/Chicago").toDate(),
    },
  }
);

orderSchema.pre('save', function (next) {
  this.updatedAt = moment.tz("America/Chicago").toDate();
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
