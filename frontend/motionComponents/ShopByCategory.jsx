import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./../src/index.css";

// Sample category data
const categories = [
  { href: "/mens", name: "Men's Shoes", imageUrl: "/mens-shoes.jpg" },
  { href: "/womens", name: "Women's Shoes", imageUrl: "/women-shoes.jpg" },
  { href: "/kids", name: "Kids' Shoes", imageUrl: "/kid-shoes.jpg" },
];

// Component to create stars for the starry background
export const StarryBackground = () => {
  const starsArray = Array.from({ length: 150 }); // Adjust the number of stars

  return (
    <div className="absolute inset-0 z-0 starry-background">
      {starsArray.map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
        />
      ))}
    </div>
  );
};

// The main ShopByCategory component
const ShopByCategory = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  // Function to check if the section is visible in the viewport
  const checkVisibility = () => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (sectionBottom < 0 || sectionTop > viewportHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    // Check visibility on page load
    checkVisibility();

    // Add scroll event listener
    window.addEventListener("scroll", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  const fireballVariants = {
    hidden: { opacity: 0, x: "-100%", y: "-100%", scale: 0.8 }, // Start off-screen
    visible: {
      opacity: 1,
      x: ["0%", "1200%"], // Moves diagonally right
      y: ["0%", "1200%"], // Moves diagonally down
      scale: [1.5, 2, 2.5], // Scaling effect
      rotate: [0, 360, 720], // Rotating effect (two full rotations)
      backgroundColor: [
        "rgba(255, 165, 0, 1)",
        "rgba(255, 69, 0, 1)",
        "rgba(255, 140, 0, 1)",
      ], // Changes from orange to red to yellow
      boxShadow: [
        "0 0 20px rgba(255, 165, 0, 0.9)",
        "0 0 40px rgba(255, 69, 0, 1)",
        "0 0 60px rgba(255, 140, 0, 1)",
      ], // Enhanced glowing shadow effect
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1.3)"], // Extra brightness to make it pop
      transition: {
        duration: 10, // Same overall duration
        ease: "easeInOut", // Smooth transition
        times: [0, 0.5, 1], // Ensures all animations happen in sync
      },
    },
  };

  // Fireball trail animation
  const trailVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.8,
      x: "2110%",
      transition: { duration: 10, ease: "easeInOut" },
    },
  };

  // Main content animation
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  // H2 animation
  const h2Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black py-20 flex flex-col justify-center items-center min-h-screen"
    >
      <StarryBackground />

      {/* Fireball Effect - Positioned Higher Above Category Items */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fireballVariants}
        className=" top-[100px] left-[-100px] w-24 h-24 bg-gradient-to-r from-yellow-800 to-red-600 rounded-full shadow-lg filter blur-sm"
        style={{
          zIndex: 50, // Ensures fireball is above category items
          boxShadow:
            "0 0 60px 20px rgba(255, 165, 0, 0.9), 0 0 100px 40px rgba(255, 140, 0, 0.8)",
          opacity: 0.8,
        }}
      >
        <img
          src="pic for fireball.jpg"
          alt="Fireball"
          className="w-full h-full object-cover rounded-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </motion.div>

      {/* Main Section Content */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={contentVariants}
        className="relative z-10 flex flex-col items-center mt-16"
      >
        <motion.h2
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={h2Variants}
          className="  text-center  text-5xl font-bold glow-text mb-10 "
        >
          Shop by Category
        </motion.h2>

        {/* Category Items */}
        <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", duration: 0.5, delay: index * 0.2 }}
            >
              <CategoryItem category={category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// CategoryItem component
const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group mb-12">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-80 z-10" />
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="text-center absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">
              {category.name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopByCategory;
