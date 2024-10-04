

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../lib/axios";
// import toast from "react-hot-toast";
// import { ChevronDown } from "lucide-react";
// import { motion as Motion } from "framer-motion";
// import LoadingSpinner from "../Components/LoadingSpinner";
// import { StarryBackground } from "../../motionComponents/ShopByCategory";
// import { useCartStore } from "../stores/useCartStore"; 
// import { useUserStore } from "../stores/useUserStore"; 
// import Popup from "../Components/Popup";
// import { loadStripe } from "@stripe/stripe-js";

// const ProductInfoPage = () => {
//   const { id } = useParams(); // Product ID from URL params
//   const navigate = useNavigate();
//   const { addToCart } = useCartStore(); // Cart store for managing cart
//   const { user } = useUserStore(); // User store for checking if user is logged in
//   const [product, setProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mainImage, setMainImage] = useState(""); // Main image state
//   const [zoomPosition, setZoomPosition] = useState({ x: 10, y: 10 });
//   const [isZooming, setIsZooming] = useState(false);
//   const [selectedSize, setSelectedSize] = useState(null); // Track selected size
//   const [showAllSizes, setShowAllSizes] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

//   const THUMBNAILS_PER_VIEW = 3; // Number of thumbnails to show at once

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`/products/product/${id}`);
//         if (response.status === 200) {
//           setProduct(response.data);
//           setMainImage(response.data.images[0]); // Set the first image as default
//         } else {
//           console.error("Product not found");
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle Add to Cart button click
//   const handleAddToCart = () => {
//     if (!user) {
//       toast.error("Please sign in to add product to cart", { id: "login" });
//       return;
//     }

//     if (!selectedSize) {
//       toast.error("Please select a size before adding to cart");
//       return;
//     }

//     // Add product to cart
//     addToCart(product, selectedSize, 1);
//     toast.success(`Product added to cart - Size: ${selectedSize}`);
//     setShowPopup(true);

//     // Hide the popup after a few seconds
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 30000);
//   };

//   // Handle thumbnail click
//   const handleThumbnailClick = (image) => {
//     setMainImage(image);
//   };

//   // Handle magnifier visibility and position
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   const handleMouseEnter = () => setIsZooming(true);
//   const handleMouseLeave = () => setIsZooming(false);

//   // Handle view bag or checkout actions
//   const handleViewBag = () => {
//     navigate("/cart");
//     setShowPopup(false);
//     window.scrollTo(0, 0);
//   };

//   const handleCheckout = async () => {
//     navigate("/shipping");
//     setShowPopup(false);
//     window.scrollTo(0, 0);
//   };

//   if (isLoading) return <LoadingSpinner />;
//   if (!product) return <div>Product not found</div>;

//   const sizes = product.sizes || [];
//   const selectedSizeObj = sizes.find((s) => s.size === selectedSize);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center -mt-6 -mb-10"
//       style={{
//         background:
//           "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
//       }}
//     >
//       <StarryBackground />
//       <Motion.div
//         className="flex flex-col md:flex-row bg-blue-200 z-10 shadow-lg rounded-lg max-w-screen-lg mx-auto p-5"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.5, delay: 0.3 }}
//       >
//         {/* Main Image Section */}
//         <div className="md:w-1/2 p-4 flex flex-col items-center justify-center relative">
//           <div
//             className="w-full h-full overflow-hidden rounded-lg shadow bg-slate-200 relative"
//             onMouseMove={handleMouseMove}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <img
//               src={mainImage}
//               alt={product.name}
//               className="w-full h-auto object-contain pt-6 pb-6"
//             />

//             {/* Magnifying Glass */}
//             {isZooming && (
//               <div
//                 className="absolute w-20 h-20 rounded-full border-2 border-gray-300 shadow-lg pointer-events-none"
//                 style={{
//                   top: `${zoomPosition.y}%`,
//                   left: `${zoomPosition.x}%`,
//                   transform: "translate(-40%, -40%)",
//                   backgroundImage: `url(${mainImage})`,
//                   backgroundRepeat: "no-repeat",
//                   backgroundSize: "800% 800%",
//                   backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                   zIndex: 10,
//                 }}
//               />
//             )}
//           </div>

//           {/* Thumbnail Images Section with Arrows */}
//           <div className="relative mt-4">
//             <div className="flex justify-center items-center space-x-2">
//               <div className="flex space-x-2 p-4 overflow-hidden">
//                 {product.images
//                   .slice(0, THUMBNAILS_PER_VIEW)
//                   .map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`${product.name} image ${index + 1}`}
//                       className="w-20 h-20 object-contain mb-4 border-2 border-gray-300 bg-slate-200 rounded-md transition-transform hover:scale-105 cursor-pointer "
//                       onClick={() => handleThumbnailClick(image)}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="md:w-1/2 p-5 flex flex-col justify-center space-y-6">
//           <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//           <p className="text-xl text-gray-600">${product.price}</p>
//           <p className="text-gray-700 leading-relaxed">{product.description}</p>

//           {selectedSizeObj && (
//             <div className="text-red-600 mb-4">
//               <p className="text-sm font-semibold">
//                 Only {selectedSizeObj.quantity} left 🔥
//               </p>
//             </div>
//           )}

//           {/* Sizes Section */}
//           {product.sizes && product.sizes.length > 0 && (
//             <div className="mt-4">
//               <p className="text-lg font-semibold text-gray-800 mb-2">Select Size:</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {product.sizes
//                   .slice(0, showAllSizes ? sizes.length : 5)
//                   .map(({ size, quantity }) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       disabled={quantity <= 0}
//                       className={`px-4 py-2 rounded-lg border-2 bg-slate-200 hover:bg-gray-300 transition-transform ${
//                         quantity <= 0
//                           ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                           : selectedSize === size
//                           ? "border-blue-500 bg-blue-100 text-blue-800"
//                           : "border-gray-300 text-gray-700"
//                       } hover:bg-gray-200 transform ${
//                         selectedSize === size ? "scale-105" : ""
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//               </div>

//               {sizes.length > 5 && (
//                 <button
//                   onClick={() => setShowAllSizes(!showAllSizes)}
//                   className="text-sm text-blue-500 flex items-center"
//                 >
//                   {showAllSizes ? "Show Less" : "Show All"}
//                   <ChevronDown
//                     size={16}
//                     className={`ml-2 transition-transform ${
//                       showAllSizes ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Add to Cart Button */}
//           <button
//             className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 px-5 py-2.5 text-center text-lg font-bold text-white shadow-lg transition-transform transform hover:scale-105"
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//         </div>
//       </Motion.div>

//       {/* Popup Notification */}
//       {showPopup && (
//         <Popup
//           message="Item added to your bag!"
//           handleViewBag={handleViewBag}
//           handleCheckout={handleCheckout}
//           onClose={() => setShowPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductInfoPage;








import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import { motion as Motion } from "framer-motion";
import LoadingSpinner from "../Components/LoadingSpinner";
import { StarryBackground } from "../../motionComponents/ShopByCategory";
import { useCartStore } from "../stores/useCartStore"; 
import { useUserStore } from "../stores/useUserStore"; 
import Popup from "../Components/Popup";
import { loadStripe } from "@stripe/stripe-js";

const ProductInfoPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart } = useCartStore(); 
  const { user } = useUserStore(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(""); 
  const [selectedThumbnail, setSelectedThumbnail] = useState(0); // Track selected thumbnail
  const [zoomPosition, setZoomPosition] = useState({ x: 10, y: 10 });
  const [isZooming, setIsZooming] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); 
  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const THUMBNAILS_PER_VIEW = 3; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/product/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
          setMainImage(response.data.images[0]); 
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please sign in to add product to cart", { id: "login" });
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    addToCart(product, selectedSize, 1);
    toast.success(`Product added to cart - Size: ${selectedSize}`);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 30000);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (image, index) => {
    setMainImage(image);
    setSelectedThumbnail(index); // Track the selected thumbnail index
  };

  // Handle magnifier visibility and position
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  const handleViewBag = () => {
    navigate("/cart");
    setShowPopup(false);
    window.scrollTo(0, 0);
  };

  const handleCheckout = async () => {
    navigate("/shipping");
    setShowPopup(false);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

  const sizes = product.sizes || [];
  const selectedSizeObj = sizes.find((s) => s.size === selectedSize);

  return (
    <div
      className="min-h-screen flex items-center justify-center -mt-6 -mb-10"
      style={{
        background:
          "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
      }}
    >
      <StarryBackground />
      <Motion.div
        className="flex flex-col md:flex-row bg-blue-200 z-10 shadow-lg rounded-lg max-w-screen-lg mx-auto p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        {/* Main Image Section */}
        <div className="md:w-1/2 p-4 flex flex-col items-center justify-center relative">
          <div
            className="w-full h-full overflow-hidden rounded-lg shadow bg-slate-200 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-contain pt-6 pb-6"
            />

            {/* Magnifying Glass */}
            {isZooming && (
              <div
                className="absolute w-20 h-20 rounded-full border-2 border-gray-300 shadow-lg pointer-events-none"
                style={{
                  top: `${zoomPosition.y}%`,
                  left: `${zoomPosition.x}%`,
                  transform: "translate(-40%, -40%)",
                  backgroundImage: `url(${mainImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "800% 800%",
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  zIndex: 10,
                }}
              />
            )}
          </div>

          {/* Thumbnail Images Section with Arrows */}
          <div className="relative mt-4">
            <div className="flex justify-center items-center space-x-2">
              <div className="flex space-x-2 p-4 overflow-hidden">
                {product.images
                  .slice(0, THUMBNAILS_PER_VIEW)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      className={`w-20 h-20 object-contain mb-4 border-2 rounded-md transition-transform hover:scale-105 cursor-pointer ${
                        selectedThumbnail === index
                          ? "border-blue-500 bg-blue-100 text-blue-800"
                          : "border-gray-300 bg-slate-200"
                      }`}
                      onClick={() => handleThumbnailClick(image, index)} // Pass index to track selection
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-5 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-600">${product.price}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {selectedSizeObj && (
            <div className="text-red-600 mb-4">
              <p className="text-sm font-semibold">
                Only {selectedSizeObj.quantity} left 🔥
              </p>
            </div>
          )}

          {/* Sizes Section */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800 mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.sizes
                  .slice(0, showAllSizes ? sizes.length : 5)
                  .map(({ size, quantity }) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={quantity <= 0}
                      className={`px-4 py-2 rounded-lg border-2 bg-slate-200 hover:bg-gray-300 transition-transform ${
                        quantity <= 0
                          ? "border-gray-400 text-gray-400 cursor-not-allowed"
                          : selectedSize === size
                          ? "border-blue-500 bg-blue-100 text-blue-800"
                          : "border-gray-300 text-gray-700"
                      } hover:bg-gray-200 transform ${
                        selectedSize === size ? "scale-105" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>

              {sizes.length > 5 && (
                <button
                  onClick={() => setShowAllSizes(!showAllSizes)}
                  className="text-sm text-blue-500 flex items-center"
                >
                  {showAllSizes ? "Show Less" : "Show All"}
                  <ChevronDown
                    size={16}
                    className={`ml-2 transition-transform ${
                      showAllSizes ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 px-5 py-2.5 text-center text-lg font-bold text-white shadow-lg transition-transform transform hover:scale-105"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </Motion.div>

      {/* Popup Notification */}
      {showPopup && (
        <Popup
          message="Item added to your bag!"
          handleViewBag={handleViewBag}
          handleCheckout={handleCheckout}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default ProductInfoPage;
