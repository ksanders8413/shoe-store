



import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  // Check if product is valid
  if (!product || !product.images || product.images.length === 0) {
    return <div>No Image Available</div>; // Placeholder for missing images
  }

  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex relative flex-col justify-between overflow-hidden rounded-lg shadow-lg border border-gray-300 hover:border-blue-500 hover:shadow-2xl transform transition duration-300 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 hover:from-gray-700 hover:via-gray-800 hover:to-gray-600"
      style={{ height: "100%" }}
    >
      {/* Image Section */}
      <div
        className="relative flex justify-center h-60 bg-white cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-contain w-full h-full opacity-90 transition-opacity duration-300 hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition duration-300" />
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-between flex-grow p-5 ">
        <h5 className="text-xl text-slate-200 hover:text-gray-300 font-semibold tracking-tight">{product.name}</h5>
        <div className="my-2 flex items-center justify-between">
        <p className="text-xl font-bold bg-gradient-to-br from-blue-200 via-[#57A0D3] to-blue-300  hover:text-gray-200 bg-clip-text text-transparent">


            ${product.price}
          </p>
        </div>
      </div>
    </Motion.div>
  );
};

export default ProductCard;
