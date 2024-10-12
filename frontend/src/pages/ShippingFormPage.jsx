



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { StarryBackground } from "../../motionComponents/ShopByCategory";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const { cart, setShippingDetails } = useCartStore();

  const shippingCost = 15;
  const stripeFeePercentage = 0.029;
  const stripeFixedFee = 0.3;
  const salesTaxRate = 0.07;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setShippingDetails(formData);

    try {
      const stripe = await stripePromise;

      const { data: session } = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            size: item.size,
          })),
          couponCode: coupon ? coupon.code : null,
          ...formData,
        }
      );

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const stripeFee = totalAmount * stripeFeePercentage + stripeFixedFee;
  const formattedStripeFee = stripeFee.toFixed(2);

  const salesTax = totalAmount * salesTaxRate;
  const formattedSalesTax = salesTax.toFixed(2);

  const totalWithShipping = totalAmount + shippingCost + stripeFee + salesTax;

  return (
    <div
      className="min-h-screen -mt-6 -mb-10 flex justify-center items-center pt-12 pb-10 px-6"
      style={{
        background:
          "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
      }}
    >
      <StarryBackground />
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-4xl w-full">
        <form
          onSubmit={handleStripePayment}
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md z-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Shipping Address
          </h2>
          <div className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <input
                  type={
                    key === "email"
                      ? "email"
                      : key === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-600 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring focus:ring-emerald-400"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700 transition duration-200"
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}
          <Link
            rel="preload"
            to="/cart"
            className="flex justify-center items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline mb-3 mt-5"
          >
            Back to Cart
          </Link>
        </form>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white w-full max-w-sm z-10">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Sales Tax</p>
                <p>${formattedSalesTax}</p>
              </div>
              <div className="flex justify-between">
                <p>Stripe Fee</p>
                <p>${formattedStripeFee}</p>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 mt-4">
                <p>Total</p>
                <p>${totalWithShipping.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
