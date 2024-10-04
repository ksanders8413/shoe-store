import React, { useState, useEffect, useRef } from 'react';
import { StarryBackground } from '../../motionComponents/ShopByCategory';
import { motion } from 'framer-motion';
import "../index.css"; // Assuming you are using custom CSS for lava-glow

const AboutPage = () => {
  // State to track whether the card is flipped or not
  const [flipped, setFlipped] = useState(false);

  // Reference to the card
  const cardRef = useRef(null);

  // Function to handle the card flip
  const handleFlip = () => {
    setFlipped(!flipped); // Toggle the flip state
  };

  // useEffect to detect clicks outside the card and flip it back
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click happened outside the card
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setFlipped(false); // Flip the card back
      }
    };

    // Add event listener to detect clicks outside the card
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="text-slate-200 min-h-screen py-16 px-4 -mt-4 -mb-10"
      style={{
        background:
          "linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)",
      }}
    >
      <StarryBackground />
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-400">
          About Fuego Kickz
        </h1>
        <div className="space-y-6">
          <p>
            Welcome to{' '}
            <span className="text-orange-400 font-semibold">Fuego Kickz</span>,
            your ultimate destination for the hottest and most exclusive
            sneakers. Whether you're a seasoned sneakerhead or just looking to
            upgrade your wardrobe, we've got you covered. Our carefully curated
            selection of men’s, women’s, and kids' footwear brings together
            style, comfort, and performance.
          </p>
          <p>
            At Fuego Kickz, we believe that every step you take should be bold,
            unique, and full of personality. Our mission is to provide you with
            the freshest kicks that not only look great but also support your
            daily grind. Whether that's hitting the streets, the gym, or anywhere
            in between.
          </p>
          <p>
            Founded with a passion for sneaker culture, we take pride in
            sourcing the latest and greatest footwear from top brands. Our
            commitment to quality and customer satisfaction ensures that you get
            the best shopping experience every time you visit us. We work
            tirelessly to bring you the most sought-after releases at
            competitive prices.
          </p>
          <p>
            Our customers are at the heart of everything we do. From offering
            new releases to exclusive deals, Fuego Kickz aims to become your
            trusted go-to sneaker destination. If you’re looking for a specific
            pair, or need recommendations, our team is here to help you every
            step of the way.
          </p>
          <p>
            Thank you for choosing Fuego Kickz. Let’s walk the journey of style
            together, one sneaker at a time.
          </p>
          <p className="font-bold text-orange-400">
            Keep it fresh. Keep it fuego.
          </p>
          
          {/* Flip Card Section */}
          <div className="flex justify-center">
            <motion.div
              ref={cardRef} // Attach ref to the card div
              className="relative w-[300px] h-[300px] perspective"
              onClick={handleFlip} // Handle click to trigger flip
            >
              {/* Front side of the card */}
              {!flipped && (
                <motion.img
                  src="aboutUs2.jpg"
                  alt="About Fuego Kickz"
                  className="absolute w-full h-full rounded-md lava-glow"
                  initial={{ opacity: 0, scale: 0.8, y: -50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                    boxShadow: '0 4px 30px rgba(0, 150, 255, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: '0 4px 20px rgba(0, 150, 255, 0.6)',
                  }}
                  transition={{ duration: 1 }}
                />
              )}

              {/* Back side of the card */}
              {flipped && (
                <motion.div
                  className="absolute w-full h-full flex justify-center items-center starry-background rounded-md"
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-white text-xl font-bold">
                    We appreciate you shopping with us!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
