// getOrderDetails.js
import mongoose from "mongoose";
import Order from "../models/order.model";

const getOrderDetails = async (orderId) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const order = await Order.findById(orderId);
    console.log(order);
  } catch (error) {
    console.error("Error fetching order:", error);
  } finally {
    await mongoose.disconnect();
  }
};

export default getOrderDetails;
