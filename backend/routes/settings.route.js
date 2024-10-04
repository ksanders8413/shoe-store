import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; // Ensure you're using the correct middleware


import { accountSettings, notificationSettings, shippingSettings } from "../controllers/settings.controller.js";

const router = express.Router();

// Route to update user information

router.put("/account", protectRoute, accountSettings);
router.put("/shipping", protectRoute, shippingSettings);
router.put("/notifications", protectRoute, notificationSettings);

export default router;
