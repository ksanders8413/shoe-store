import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-8 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 shadow-lg sm:p-10">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        {/* Product Image */}
        <div className="shrink-0 md:order-1 bg-slate-200 rounded-md -m-2">
          <img
            className="h-20 md:h-32 rounded object-cover"
            src={item.images[0]}
            alt={item.name}
          />
        </div>

        {/* Product Details */}
        <div className="w-full flex-1 space-y-2 md:space-y-4 md:max-w-md md:order-2">
          <p className="text-lg font-semibold text-white hover:text-emerald-400 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-400 truncate">{item.description}</p>

          {/* Quantity and Remove Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Decrease Quantity */}
              <button
                disabled={item.quantity <= 1}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                  focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                onClick={() =>
                  item.quantity > 1 &&
                  updateQuantity(item._id, item.size, item.quantity - 1)
                }
              >
                <Minus className="text-gray-300" />
              </button>

              <p className="text-white text-lg">{item.quantity}</p>

              {/* Increase Quantity */}
              <button
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                  focus:ring-2 focus:ring-emerald-500"
                onClick={() =>
                  updateQuantity(item._id, item.size, item.quantity + 1)
                }
              >
                <Plus className="text-gray-300" />
              </button>
            </div>

            {/* Remove from Cart */}
            <button
              className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id, item.size)}
            >
              <Trash className="h-5 w-5" />
              <span className="ml-1">Remove</span>
            </button>
          </div>
        </div>

        {/* Product Price */}
        <div className="text-end md:order-3 md:w-32 text-slate-200">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
