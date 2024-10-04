import { motion } from "framer-motion";

const WavyImage = ({ src, alt }) => {
  const waveAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="overflow-hidden max-w-full">
    <motion.img
      src={src}
      alt={alt}
      initial="initial"
      animate="animate"
      variants={waveAnimation}
      className="  contain w-full h-auto rounded-lg shadow-lg"
    />
    </div>
  );
};

export default WavyImage;
