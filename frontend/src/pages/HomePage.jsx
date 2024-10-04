import { Link } from "react-router-dom";
import "../index.css";
import "../App.css";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Button from "../Components/Button";
import ShopByCategory from "../../motionComponents/ShopByCategory";

const categories = [
  { href: "/mens", name: "Men's Shoes", imageUrl: "/mens-shoes.jpg" },
  { href: "/womens", name: "Women's Shoes", imageUrl: "/women-shoes.jpg" },
  { href: "/kids", name: "Kids' Shoes", imageUrl: "/kid-shoes.jpg" },
];

const featuredProducts = [
  { id: 1, name: "Air Jordan 1", price: "$160", imageUrl: "/air-jordan-1.jpg" },
  {
    id: 2,
    name: "Nike Air Max 270",
    price: "$150",
    imageUrl: "/air-max-270.jpg",
  },
  { id: 3, name: "Air Jordan 3", price: "$190", imageUrl: "/air-jordan-3.jpg" },
  { id: 4, name: "Nike Dunk Low", price: "$110", imageUrl: "/dunk-low.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden -mt-6 -mb-10">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] sm:h-[100vh] md:h-[100vh] lg:h-[100vh] object-cover flex items-center justify-center ">
        {" "}
        {/* Added margin-bottom */}
        <img
          src="/banner 3.jpg"
          alt="Descriptive Alt Text"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center ">
        <Link to="/shopall">
      <motion.div
        // Pulsating effect
        animate={{ scale: [0.9, 1, 0.9] }} // Changes scale to create the pulse
        transition={{
          duration: 2, // Duration of one pulse cycle
          repeat: Infinity, // Infinite loop for pulsating effect
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <Button />
      </motion.div>
    </Link>
        </div>
      </div>

      <ShopByCategory categories={categories} />

      <FeaturedProducts featuredProducts={products} />

      {/* Special Deals Section */}
      {/* <SpecialDeals products={products} /> */}
    </div>
  );
};

export default HomePage;
