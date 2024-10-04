import express from "express";
import Order from "../models/order.model.js";
import User from "../models/user.model.js"; 
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new order (POST to /orders)
router.post("/", protectRoute, async (req, res) => {
  const { products, totalAmount, stripeSessionId } = req.body;

  const userId = req.user._id; 

  // Validate incoming data
  if (!userId || !products?.length || !totalAmount || !stripeSessionId) {
    return res.status(400).json({
      success: false,
      message:
        "Required fields are missing: userId, products, totalAmount, and stripeSessionId are mandatory.",
    });
  }

  try {
    // Log for debugging: check request details
    console.log("Received request for new order:", {
      userId,
      products,
      totalAmount,
      stripeSessionId,
    });

    res.status(200).json({
      success: true,
      message: "Order processed successfully.",
    });

  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while processing order.",
    });
  }
});

export default router;




