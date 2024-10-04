import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Menu,
  Settings,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-gray-900 to-blue-600 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-red-900">
      <div className="w-full max-w-full px-4 py-3"> {/* Added full width and padding */}
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-slate-200 hover:text-orange-400 flex items-center transition duration-300"
          >
            Fuego Kickz
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <Link
              to="/"
              className="text-slate-200 hover:text-orange-400 transition duration-300 ease-in-out whitespace-nowrap"
            >
              Home
            </Link>

            {/* Shop Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out whitespace-nowrap"
                onClick={() => setShopDropdownOpen(!isShopDropdownOpen)}
              >
                Shop
              </button>
              {isShopDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-md z-50">
                  <Link
                    to="/category/mens"
                    className="block px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition duration-300 ease-in-out"
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Men's
                  </Link>
                  <Link
                    to="/category/womens"
                    className="block px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition duration-300 ease-in-out"
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Women's
                  </Link>
                  <Link
                    to="/category/kids"
                    className="block px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition duration-300 ease-in-out"
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Kids'
                  </Link>
                </div>
              )}
            </div>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out whitespace-nowrap"
              >
                Admin Dashboard
              </Link>
            )}

            {user && (
              <>
                <Link
                  to="/cart"
                  className="relative group text-slate-200 hover:text-orange-400 transition duration-300 ease-in-out whitespace-nowrap"
                >
                  <ShoppingCart
                    className="inline-block mr-1 group-hover:text-orange-400"
                    size={20}
                  />
                  <span className="hidden sm:inline">Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -left-2 bg-emerald-400 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-orange-400 transition duration-300 ease-in-out">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out flex items-center whitespace-nowrap"
                >
                  <Settings size={20} className="mr-2" />
                </Link>
              </>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out whitespace-nowrap"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-orange-800 text-white py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out whitespace-nowrap"
                >
                  <UserPlus size={18} className="mr-2" />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out whitespace-nowrap"
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-orange-400 transition duration-300 ml-auto"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Mobile Menu Links */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-0 w-48 bg-gray-800 shadow-md p-4 rounded-lg md:hidden">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/category/mens"
                  className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Men's
                </Link>
                <Link
                  to="/category/womens"
                  className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Women's
                </Link>
                <Link
                  to="/category/kids"
                  className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kids'
                </Link>

                {isAdmin && (
                  <Link
                    className="bg-emerald-700 hover:bg-orange-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                    to="/admin"
                  >
                    <Lock className="inline-block mr-1" size={18} />
                    <span>Dashboard</span>
                  </Link>
                )}

                {user ? (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="bg-emerald-600 hover:bg-orange-800 text-white py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlus size={18} className="mr-2" />
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-md flex items-center transition"
                                            onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn size={18} className="mr-2" />
                      Login
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

