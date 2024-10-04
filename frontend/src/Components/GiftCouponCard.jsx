// import { toast } from "react-hot-toast";

// import { motion as Motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useCartStore } from "../stores/useCartStore";

// const GiftCouponCard = () => {
//   const [userInputCode, setUserInputCode] = useState("");
//   const { coupon, isCouponApplied, applyCoupon, removeCoupon, getMyCoupon } = useCartStore();

//   // Fetch coupon on component mount
//   useEffect(() => {
//     getMyCoupon();
//   }, []); // No need to add getMyCoupon in the dependency array

//   // Set input field to the current coupon code when coupon changes
//   useEffect(() => {
//     if (coupon) setUserInputCode(coupon.code);
//   }, [coupon]);

//   const handleApplyCoupon = () => {
//     if (userInputCode) {
//       applyCoupon(userInputCode); // Apply the coupon from the input
//     } else {
//       toast.error("Please enter a valid coupon code");
//     }
//   };

//   const handleRemoveCoupon = () => {
//     removeCoupon(); // Call removeCoupon from the store to remove the applied coupon
//   };

//   return (
//     <Motion.div
//       className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <div className="space-y-4">
//         <div>
//           <label
//             htmlFor="voucher"
//             className="mb-2 block text-sm font-medium text-gray-300"
//           >
//             Do you have a voucher or gift card?
//           </label>
//           <input
//             type="text"
//             id="voucher"
//             className="w-full block rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
//             placeholder="Enter your code"
//             value={userInputCode} // Bind input to state
//             onChange={(e) => setUserInputCode(e.target.value)}
//             required
//           />
//         </div>
//         <Motion.button
//           className="flex items-center justify-center w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleApplyCoupon}
//         >
//           Apply Code
//         </Motion.button>
//       </div>

//       {coupon && isCouponApplied && (
//         <div className="mt-4">
//           <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
//           <p className="mt-2 text-sm text-gray-400">
//             {coupon.code} - {coupon.discountPercentage}% off
//           </p>

//           <Motion.button
//             type="button"
//             className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleRemoveCoupon}
//           >
//             Remove Coupon
//           </Motion.button>
//         </div>
//       )}

//       {!isCouponApplied && coupon && (
//         <div className="mt-4">
//           <h3 className="text-lg font-medium text-gray-300">
//             Your Available Coupon
//           </h3>
//           <p className="mt-2 text-sm text-gray-400">
//             {coupon.code} - {coupon.discountPercentage}% off
//           </p>
//         </div>
//       )}
//     </Motion.div>
//   );
// };

// export default GiftCouponCard;

import { toast } from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, removeCoupon, getMyCoupon } =
    useCartStore();

  // Fetch coupon on component mount
  useEffect(() => {
    getMyCoupon();
  }, []);

  // Set input field to the current coupon code when coupon changes
  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (userInputCode) {
      applyCoupon(userInputCode); // Apply the coupon from the input
    } else {
      toast.error("Please enter a valid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon(); // Call removeCoupon from the store to remove the applied coupon
  };

  return (
    <Motion.div
      className="space-y-8 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 shadow-lg sm:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Have a coupon or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="w-full block rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Enter your code"
            value={userInputCode} // Bind input to state
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        {/* Apply Code Button */}
        <Motion.button
          className="w-full flex items-center justify-center transition-transform rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-gradient-to-l hover:from-emerald-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </Motion.button>
      </div>

      {coupon && isCouponApplied && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-emerald-300">
            Applied Coupon
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>

          {/* Remove Coupon Button */}
          <Motion.button
            type="button"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </Motion.button>
        </div>
      )}

      {!isCouponApplied && coupon && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-emerald-300">
            Available Coupon
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </Motion.div>
  );
};

export default GiftCouponCard;
