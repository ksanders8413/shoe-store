import { motion } from "framer-motion";

const Button= () => {
  const buttonVariants = {
    animate: {
      borderColor: [
        "#39ff14",  // Neon Green
        "#00FFFF",  // Vibrant Cyan
        "#FF007F",  // Hot Pink
        "#FFFF00",  // Bright Yellow
        "#FF4500",  // Neon Orange
        "#39ff14"   // Back to Neon Green
      ],
      transition: {
        duration: 3,  // Animation cycle duration
        ease: "easeInOut",
        repeat: Infinity,  // Loops infinitely
        repeatType: "loop"
      }
    }
  };

  return (
<motion.button
  className="hidden sm:block md:block bg-gradient-to-r from-red-500 to-orange-500 border-4 border-yellow-400 hover:from-red-600 hover:to-orange-600 hover:border-yellow-500 text-white font-bold px-2 py-1 rounded-lg transition-all duration-300 sm:w-20 sm:h-8 md:w-24 md:h-10 lg:w-28 lg:h-12 sm:text-sm sm:mt-20 md:mt-24 lg:mt-26 md:text-base lg:text-lg relative whitespace-nowrap"
  variants={buttonVariants}
  animate="animate"
>
  Shop All
</motion.button>





  );
};

export default Button;
