// // // Popup.jsx
// // import React from 'react';
// // import '../index.css';

// // const Popup = ({ message, handleViewBag, handleCheckout }) => {
// //   return (
// //     <div className="popup-overlay">
// //       <div className="popup">
// //         <p>{message}</p>
// //         <button onClick={handleViewBag}>View Bag</button>
// //         <button onClick={handleCheckout}>Checkout</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Popup;





// import React from 'react';
// import { X } from 'lucide-react'; // Using Lucide icons for the "X"
// import '../index.css';

// const Popup = ({ message, handleViewBag, handleCheckout, handleClose }) => {
//   return (
//     <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="popup relative bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg animate-slide-in-up">
//         {/* Close Icon */}
//         <button
//           onClick={handleClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* Content */}
//         <div className="p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             {message}
//           </h2>

//           {/* Buttons */}
//           <div className="flex justify-between gap-4">
//             <button
//               onClick={handleViewBag}
//               className="w-full py-3 px-5 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition-all duration-300"
//             >
//               View Bag
//             </button>
//             <button
//               onClick={handleCheckout}
//               className="w-full py-3 px-5 bg-emerald-500 text-white rounded-lg font-semibold shadow hover:bg-emerald-600 transition-all duration-300"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;




// Popup.jsx
import React from 'react';
import { X } from 'lucide-react'; // For the elegant X icon
import '../index.css';

const Popup = ({ message, handleViewBag, handleCheckout, handleClose }) => {
  return (
    <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="popup relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md transition-transform transform-gpu scale-100 duration-300 ease-out">
        
        {/* Close button - X icon */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Message */}
        <div className="popup-content text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Action Required</h2>
          <p className="text-gray-600">{message}</p>
          
          {/* Buttons */}
          <div className="popup-actions flex justify-between space-x-4">
            <button 
              onClick={handleViewBag} 
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              View Bag
            </button>
            <button 
              onClick={handleCheckout} 
              className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

