import { useEffect, useState, useRef } from "react";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import LoadingSpinner from "../Components/LoadingSpinner";
import { CheckCircle, ArrowRight, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const PurchaseSuccessPage = () => {
  const { clearCart, processOrder, email } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // To hold order details
  const orderProcessedRef = useRef(false);

  // const handleCheckoutSuccess = async (sessionId) => {
  //   try {
  //     if (orderProcessedRef.current) return;
  //     orderProcessedRef.current = true;

  //     // Call your backend to retrieve the order details
  //     const checkoutResponse = await axios.post(
  //       "http://localhost:5000/api/payments/checkout-success",
  //       { sessionId }
  //     );

  //     console.log("Checkout response:", checkoutResponse.data);

  //     const orderResponse = checkoutResponse.data.order; // Access the order directly from checkoutResponse
  //     console.log("Order response:", orderResponse); // Log the order response

  //     if (orderResponse) {
  //       // Clear cart after successful order processing
  //       clearCart();
  //     } else {
  //       console.error("Error in the order response");
  //     }
  //   } catch (error) {
  //     console.error("Error processing checkout: ", error);
  //     setError(
  //       `An error occurred while processing your order: ${
  //         error.response?.data?.message || error.message
  //       }`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleCheckoutSuccess = async (sessionId) => {
    try {
      if (orderProcessedRef.current) return;
      orderProcessedRef.current = true;

      // Call your backend to retrieve the order details
      const checkoutResponse = await axios.post(
        "http://localhost:5000/api/payments/checkout-success",
        { sessionId }
      );

      console.log("Checkout response:", checkoutResponse.data);

      const orderResponse = checkoutResponse.data.order; // Access the order directly from checkoutResponse
      console.log("Order response:", orderResponse); // Log the order response

      if (orderResponse) {
        // Process the order and update the stock
        await processOrder(sessionId); // Trigger the stock update process

        // Clear cart after successful order processing
        clearCart();

        // Set the retrieved order details to state
        setOrderDetails(orderResponse); // Store order details in state
      } else {
        console.error("Error in the order response");
      }
    } catch (error) {
      console.error("Error processing checkout: ", error);
      setError(
        `An error occurred while processing your order: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsLoading(false);
      setError("No session ID found in the URL.");
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center">{`Error: ${error}`}</div>;

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        recycle={false}
      />
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Purchase Successful!
          </h1>
          <p className="text-gray-300 text-center mb-2">
            Thank you for your order. We're processing it now.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email {email} for order details and updates.
          </p>

          {/* Display order details if available */}
          {orderDetails && (
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Order number</span>
                <span className="text-sm font-semibold text-emerald-400">
                  #{orderDetails._id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Estimated delivery
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  3-5 business days
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
