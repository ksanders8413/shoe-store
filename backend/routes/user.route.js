

import { protectRoute } from '../middleware/auth.middleware.js';
import User from '../models/user.model.js';
import express from 'express';

const router = express.Router();

router.get('/', protectRoute, async (req, res) => {
  try {
    const userId = req.user._id; // Access user ID from req.user
    const user = await User.findById(userId).select('+email +role'); // Include role in the query
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
