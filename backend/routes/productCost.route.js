import express from "express";
import Product from "../models/productCost.model.js";

const router = express.Router();


// POST route to save a product cost
router.post("/save-product", async (req, res) => {
  try {
    const { name, baseCost, shippingCost, taxRate, customCosts, totalCost } =
      req.body;

    const newProduct = new Product({
      name,
      baseCost,
      shippingCost,
      taxRate,
      customCosts,
      totalCost,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
});

export default router;
