import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"; // Import social icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10 relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* About Fuego Kickz */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-400">Fuego Kickz</h2>
          <p className="mb-4">
            Fuego Kickz offers the hottest collection of sneakers for men, women, and kids. Stay on top of your sneaker game with us!
          </p>
          <Link to="/about" className="text-gray-400 hover:text-orange-400 transition duration-300">
            Learn More About Us
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/men" className="hover:text-orange-400 transition duration-300">Men's Shoes</Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-orange-400 transition duration-300">Women's Shoes</Link>
            </li>
            <li>
              <Link to="/kids" className="hover:text-orange-400 transition duration-300">Kids' Shoes</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400 transition duration-300">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Follow Us</h3>
          <div className="flex space-x-4 items-center justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition duration-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:info@fuegokickz.com"
              className="hover:text-orange-400 transition duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Fuego Kickz. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
