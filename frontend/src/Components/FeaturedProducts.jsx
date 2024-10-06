


import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import ProductCard from "../Components/ProductCard"; // Import your ProductCard component
import "../index.css";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItems = featuredProducts.length;

  // Ref to track the section visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
      return prevIndex < maxIndex ? prevIndex + 1 : 0;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
      return prevIndex > 0 ? prevIndex - 1 : maxIndex;
    });
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 3, delay: 0.2 }}
      className="relative py-12 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen pb-2"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 lava-glow">
        <img
          src="saturn3.jpg"
          className="w-full h-full object-cover"
          alt="Saturn Background"
          style={{
            opacity: 0.5,
            mixBlendMode: "lighten",
          }}
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-24">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center  text-5xl font-bold glow-text mb-10"
        >
          Featured Products
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative mt-8"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
                width: `${(totalItems * 100) / itemsPerPage}%`,
              }}
            >
              {featuredProducts?.map((product) => (
                <motion.div
                  key={product._id}
                  className="w-full mt-4 mb-4 px-2"
                  style={{ width: `${100 / itemsPerPage}%` }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Use ProductCard here */}
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-400 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-400 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;











// import { useEffect, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion, useInView } from "framer-motion";
// import ProductCard from "../Components/ProductCard"; // Import your ProductCard component
// import "../index.css";

// const FeaturedProducts = ({ fetchFeaturedProducts }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const totalItems = featuredProducts.length;

//   // Ref to track the section visibility
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

//   // Fetch the featured products when the component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const products = await fetchFeaturedProducts(); // Assuming fetchFeaturedProducts returns a promise
//         setFeaturedProducts(products);
//       } catch (err) {
//         setError("Failed to load featured products.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [fetchFeaturedProducts]);

//   // Handle window resize to set items per page
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setItemsPerPage(1);
//       else if (window.innerWidth < 1024) setItemsPerPage(2);
//       else if (window.innerWidth < 1280) setItemsPerPage(3);
//       else setItemsPerPage(4);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => {
//       const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
//       return prevIndex < maxIndex ? prevIndex + 1 : 0;
//     });
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => {
//       const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
//       return prevIndex > 0 ? prevIndex - 1 : maxIndex;
//     });
//   };

//   if (isLoading) {
//     return <div className="text-center text-white">Loading featured products...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <motion.div
//       ref={sectionRef}
//       initial={{ opacity: 0, y: 100 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 3, delay: 0.2 }}
//       className="relative py-12 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen pb-2"
//     >
//       {/* Background Image Layer */}
//       <div className="absolute inset-0 z-0 lava-glow">
//         <img
//           src="saturn3.jpg"
//           className="w-full h-full object-cover"
//           alt="Saturn Background"
//           style={{
//             opacity: 0.5,
//             mixBlendMode: "lighten",
//           }}
//         />
//       </div>

//       {/* Main Content Layer */}
//       <div className="relative z-10 container mx-auto px-4 mt-24">
//         <motion.h2
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={isInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-center  text-5xl font-bold glow-text mb-10"
//         >
//           Featured Products
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, x: -100 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="relative mt-8"
//         >
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
//                 width: `${(totalItems * 100) / itemsPerPage}%`,
//               }}
//             >
//               {Array.isArray(featuredProducts) && featuredProducts.map((product) => (
//                 <motion.div
//                   key={product._id}
//                   className="w-full mt-4 mb-4 px-2"
//                   style={{ width: `${100 / itemsPerPage}%` }}
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={isInView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                 >
//                   {/* Use ProductCard here */}
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Previous Button */}
//           <button
//             onClick={prevSlide}
//             className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-400 shadow-lg"
//           >
//             <ChevronLeft className="w-6 h-6 text-white" />
//           </button>

//           {/* Next Button */}
//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-400 shadow-lg"
//           >
//             <ChevronRight className="w-6 h-6 text-white" />
//           </button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default FeaturedProducts;




