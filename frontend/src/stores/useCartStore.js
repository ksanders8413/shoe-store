import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

 

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  totalAmount: 0,
  userId: null,
  email: "",
  shippingDetails: {},
  isCouponApplied: false,
  stripeSessionId: null,

  // Set user information
  setUser: (id, email) => set({ userId: id, email }),

  // Fetch user details and store them in state
  fetchUser: async () => {
    try {
      const response = await axios.get("/user");
      set({
        userId: response.data._id,
        email: response.data.email,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ userId: null, email: "" });
    }
  },

  // Set shipping details for the current order
  setShippingDetails: (details) => {
    set({ shippingDetails: details });
  },


  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  // Apply coupon
  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  // Remove coupon
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },


  // Get cart items from backend and store them
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Clear the cart, coupon, and totals
  clearCart: () => {
    set({ cart: [], coupon: null, total: 0, totalAmount: 0 });
    localStorage.removeItem("cart"); // Clear cart from local storage
  },

  // Add item to the cart and recalculate totals
  addToCart: async (product, size, quantity) => {
    try {
      await axios.post("/cart", { productId: product._id, size, quantity });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id && item.size === size
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [...prevState.cart, { ...product, size, quantity }];
        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Remove an item from the cart
  removeFromCart: async (productId, size) => {
    try {
      await axios.delete(`/cart`, { data: { productId, size } });
      set((prevState) => ({
        cart: prevState.cart.filter(
          (item) => item._id !== productId || item.size !== size
        ),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Update the quantity of an item in the cart
  updateQuantity: async (productId, size, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId, size);
        return;
      }

      await axios.put(`/cart/${productId}`, { size, quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId && item.size === size
            ? { ...item, quantity }
            : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Calculate the total and totalAmount for the cart
  calculateTotals: () => {
    const { cart, coupon } = get();
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = totalAmount;

    if (coupon) {
      const discount = totalAmount * (coupon.discountPercentage / 100);
      total = totalAmount - discount;
    }

    set({ totalAmount, total });
  },
  // Process the order by sending it to the backend
  processOrder: async (stripeSessionId, shippingDetails) => {
    const { cart, totalAmount, userId, updateProductStock } = get();

    // Check if the cart has items
    if (!cart || cart.length === 0) {
      console.error("Cart is empty or undefined");
      toast.error("Cannot process order. Cart is empty.");
      return;
    }

    try {
      const cartItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      }));

      const payload = {
        userId,
        products: cartItems,
        totalAmount,
        stripeSessionId,
        shippingAddress: shippingDetails,
      };

      const response = await axios.post("/orders", payload);

      if (response.status === 200) {
        console.log("Order created successfully:", response.data);
        await Promise.all(
          cart.map(async (item) => {
            if (item._id && item.size && item.quantity) {
              await updateProductStock(item._id, item.size, item.quantity);
            }
          })
        );

        get().clearCart();
        toast.success("Order processed successfully");
        return response.data;
      } else {
        toast.error("Error processing order");
      }
    } catch (error) {
      console.error("Error during order processing:", error);
      toast.error("An error occurred");
    }
  },

  // Update product stock in the backend
  updateProductStock: async (productId, size, quantity) => {
    if (!productId || !size || !quantity) {
      console.error("Missing required data for stock update:", {
        productId,
        size,
        quantity,
      });
      return;
    }

    try {
      await axios.put(`/inventory/update-stock/${productId}`, {
        size: Number(size),
        quantity: Number(quantity),
      });
      console.log("Stock updated for product ID:", productId);
    } catch (error) {
      console.error("Error during stock update:", error);
      toast.error(error.response?.data?.message || "Failed to update stock");
    }
  },
}));

