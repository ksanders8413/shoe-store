import { motion as Motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Info } from "lucide-react"; // Importing the Info icon
import { useState } from "react";

const OrderSummary = () => {
  const { total, coupon, isCouponApplied, cart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false); // State to show or hide the tooltip
  const navigate = useNavigate();

  // Example: Mock sales tax rate based on customer's location (e.g., 7% for the demo)
  const salesTaxRate = 0.07; // You can make this dynamic based on the customer's location
  const shippingCost = 15; // Fixed shipping cost
  const stripePercentage = 0.029; // Stripe fee percentage (2.9%)
  const stripeFixedFee = 0.30; // Stripe fixed fee (30 cents)

  // Calculate totalAmount from the cart items
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate Sales Tax
  const salesTax = (totalAmount + shippingCost) * salesTaxRate;
  const formattedSalesTax = salesTax.toFixed(2);

  // Calculate the final total before Stripe fee
  const totalBeforeStripe = totalAmount + shippingCost + salesTax;

  // Calculate Stripe processing fee (after shipping and tax)
  const stripeFee = totalBeforeStripe * stripePercentage + stripeFixedFee;
  const formattedStripeFee = stripeFee.toFixed(2);

  // Total including shipping, Stripe fee, and sales tax
  const totalWithAllFees = totalBeforeStripe + stripeFee;
  const formattedTotalWithAllFees = totalWithAllFees.toFixed(2);

  const savings = totalAmount - total;
  const formattedSavings = savings > 0 ? savings.toFixed(2) : null;

  const handleShippingFormSubmit = async (e) => {
    e.preventDefault();
    navigate("/shipping");
    window.scrollTo(0, 0);
  };

  return (
    <Motion.div
      className="space-y-8 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 shadow-lg sm:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Order Summary Title */}
      <p className="text-2xl font-semibold text-slate-200 tracking-wide">Order Summary</p>

      <div className="space-y-6">
        <div className="space-y-5">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id || item._id}
              className="flex justify-between items-center border-b border-gray-600 py-4"
            >
              <div className="flex items-center">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-14 w-14 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">Size: {item.size}</p>
                  <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-xs text-gray-400">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-slate-200">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Shipping Cost */}
        <div className="flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Shipping:</p>
          <p className="text-base font-medium text-slate-200">${shippingCost.toFixed(2)}</p>
        </div>

        {/* Sales Tax */}
        <div className="flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Sales Tax (7%):</p>
          <p className="text-base font-medium text-slate-200">${formattedSalesTax}</p>
        </div>

        {/* Stripe Processing Fee */}
        <div className="flex items-center justify-between relative">
          <p className="text-base font-normal text-gray-300 flex items-center">
            Stripe Fee:
            {/* Info Icon */}
            <span
              className="ml-2 text-gray-400 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info size={16} />
            </span>
          </p>
          <p className="text-base font-medium text-slate-200">${formattedStripeFee}</p>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute top-0 right-0 mt-6 w-48 bg-gray-700 text-gray-200 p-2 rounded shadow-lg text-sm z-10">
              The Stripe fee includes 2.9% of the total + 30 cents per transaction.
            </div>
          )}
        </div>

        {/* Total Amount */}
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-4">
            <dt className="text-base font-bold text-white">Total Amount:</dt>
            <dd className="text-xl font-bold text-slate-200">${formattedTotalWithAllFees}</dd>
          </dl>

          {/* Savings */}
          {formattedSavings && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-sm font-normal text-gray-300">Savings:</dt>
              <dd className="text-sm font-medium text-emerald-400">${formattedSavings}</dd>
            </dl>
          )}

          {/* Coupon Code */}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-sm font-normal text-gray-300">Coupon: ({coupon.code})</dt>
              <dd className="text-sm font-medium text-emerald-400">
                {coupon.discountPercentage}%
              </dd>
            </dl>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
        )}

        {/* Proceed Button */}
        <Motion.button
          className={`w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-gradient-to-l hover:from-emerald-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShippingFormSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Proceed to Shipping"}
        </Motion.button>

        {/* Continue Shopping */}
        <div className="flex flex-col items-center justify-center gap-2 pt-4">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
             <MoveLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </Motion.div>
  );
};

export default OrderSummary;
