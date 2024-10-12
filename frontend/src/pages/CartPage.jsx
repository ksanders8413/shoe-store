



import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { StarryBackground } from "../../motionComponents/ShopByCategory";
import LoadingSpinner from "../Components/LoadingSpinner";
import PeopleAlsoBought from "../Components/PeopleAlsoBought";
import OrderSummary from "../Components/OrderSumary";

const CartPage = () => {
  const { cart, getCartItems } = useCartStore();
  const [loading, setLoading] = useState(true);

  // Fetch cart items when the component mounts
  useEffect(() => {
    async function fetchCart() {
      try {
        await getCartItems(); // Fetch cart items
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    }
    fetchCart();
  }, [getCartItems]);

  // Show a loading spinner if cart is loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="py-8 flex items-center justify-center md:py-16 -mt-8 -mb-10 min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
      }}
    >
      <StarryBackground />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <Motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6 mb-5">
                {cart.map((item, index) => (
                  <CartItem
                    key={`${item._id}-${item.size}-${index}`} // Ensure unique key
                    item={item}
                  />
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="space-y-5">
                <OrderSummary className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl" />
              </div>
            )}

            {cart.length > 0 && <PeopleAlsoBought />}
          </Motion.div>

          {cart.length > 0 && (
            <Motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Additional content */}
            </Motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// Empty cart UI component
const EmptyCartUI = () => (
  <Motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link
      className="relative z-10 mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Start Shopping
    </Link>
  </Motion.div>
);
