import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// Get products from cart
export const getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "cartItems.product",
      model: "Product",
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure cartItems and product references are populated correctly
    const cartItems = user.cartItems
      .map((item) => {
        if (!item.product) {
          console.error("Product not populated for cart item:", item);
          return null;
        }

        const product = item.product.toJSON();
        return {
          ...product,
          quantity: item.quantity,
          size: item.size,
        };
      })
      .filter((item) => item !== null);

    res.json(cartItems);
  } catch (error) {
    console.error("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    // Validate input fields
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    // Fetch the user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cartItems = user.cartItems || [];

    // Convert productId to a string for comparison
    const productIdStr = productId.toString();

    // Check if the product is already in the cart
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productIdStr && item.size === size
    );

    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new product to the cart
      user.cartItems.push({ product: productIdStr, size, quantity });
    }

    // Clean up cart items to remove any invalid entries
    user.cartItems = user.cartItems.filter(
      (item) => item.product && item.size && item.quantity > 0
    );

    await user.save();

    // Fetch populated cart items with product prices
    const populatedUser = await User.findById(req.user.id).populate({
      path: "cartItems.product",
      select: "price", // Select only the price field
    });

    // Calculate totalAmount based on the populated cart items
    const totalAmount = populatedUser.cartItems.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + item.product.price * item.quantity;
      } else {
        console.error("Product not populated for cart item:", item);
        return total;
      }
    }, 0);

    res.json({ cartItems: populatedUser.cartItems, totalAmount });
  } catch (error) {
    console.error("Error in addToCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const updateQuantity = async (req, res) => {
  const { productId } = req.params; // Get productId from URL parameter
  const { size, quantity } = req.body; // Get size and quantity from request body

  // Validate productId
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Convert productId to string for comparison
    const productIdStr = productId.toString();

    // Find the item in the user's cart
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productIdStr && item.size === size
    );

    if (existingItem) {
      if (quantity === 0) {
        // Remove the item from the cart if quantity is zero
        user.cartItems = user.cartItems.filter(
          (item) => item.product.toString() !== productIdStr || item.size !== size
        );
      } else {
        // Update the quantity of the existing item
        existingItem.quantity = quantity;
      }

      await user.save();
      return res.json(user.cartItems);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error in updateQuantity controller:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const removeAllFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!productId) {
      // Clear entire cart if no productId is provided
      user.cartItems = [];
    } else {
      // Remove specific product and size if provided
      user.cartItems = user.cartItems.filter(
        (item) =>
          !item.product.equals(new mongoose.Types.ObjectId(productId)) ||
          item.size !== size
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error in removeAllFromCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, size, quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const sizeEntry = product.sizes.find(
      (sizeEntry) => sizeEntry.name === size
    );
    if (!sizeEntry) return res.status(404).json({ message: "Size not found" });

    sizeEntry.quantity += quantity;
    await product.save();

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cartItems = user.cartItems.filter(
      (item) =>
        !item.product.equals(mongoose.Types.ObjectId(productId)) ||
        item.size !== size
    );

    await user.save();
    res
      .status(200)
      .json({ message: "Item removed from cart and stock updated" });
  } catch (error) {
    console.error("Error in removeFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
