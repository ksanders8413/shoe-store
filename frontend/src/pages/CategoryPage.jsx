import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import ProductCard from "../Components/ProductCard";
import { StarryBackground } from "../../motionComponents/ShopByCategory";
import "../index.css";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();

  const { category } = useParams();
  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  console.log("products", products);

  return (
    <div
      className="min-h-screen max-w-screen relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 -mb-10 -mt-8 "
      style={{
        background:
          "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
      }}
    >
      <StarryBackground />

      <Motion.h1
        className="text-center text-4xl sm:text-5xl font-bold text-slate-200 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 10, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Motion.h1>

      <Motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {products?.length === 0 && (
          <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full ">
            No products found
          </h2>
        )}

        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Motion.div>
    </div>
  );
};

export default CategoryPage;
