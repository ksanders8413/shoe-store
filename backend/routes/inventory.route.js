// inventory.route.js
import express from 'express';
import { checkStock, updateStock } from '../controllers/inventory.controller.js'; // Adjust the path as needed
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Define the route to update stock
router.put("/update-stock/:id", protectRoute, updateStock);
router.get("/check-stock/:id", protectRoute, checkStock);

export default router;
