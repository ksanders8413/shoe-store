import express from "express";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  deleteProduct,
  getRecomendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
  getProductById,
} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { cloudinaryUpload } from "../lib/cloudinary.js"; // Import the local upload

const router = express.Router();

// Define your routes
router.get("/", getAllProducts);
// router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecomendedProducts);
router.get("/product/:id", getProductById);

// Use localUpload for image uploads
router.post(
  "/",
  cloudinaryUpload.array("images", 5),
  protectRoute,
  adminRoute,
  createProduct
);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
