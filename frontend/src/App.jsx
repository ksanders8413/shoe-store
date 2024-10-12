

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Components and Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";
import Footer from "./Components/Footer.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductInfoPage from "./pages/ProductInfoPage.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ShopallPage from "./pages/ShopallPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import ShippingFormPage from "./pages/ShippingFormPage.jsx";

// Stores
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore.js";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route component to check user authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" />;
};

// Admin Protected Route
const AdminRoute = ({ children }) => {
  const { user } = useUserStore();
  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

// Main App component
function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
      setIsAuthChecked(true);
    };

    checkUserAuth();
  }, [checkAuth]);

  // Fetch cart items when authentication check completes and user is authenticated
  useEffect(() => {
    if (isAuthChecked && user) {
      getCartItems();
    }
  }, [isAuthChecked, user, getCartItems]);

  // Show loading spinner while checking authentication
  if (checkingAuth || !isAuthChecked) return <LoadingSpinner />;

  return (
    <div className="min-h-screen contain-content overflow-hidden bg-gradient-to-t from-blue-950 via-blue-900 via-blue-800 via-blue-700 to-blue-400">
      <ScrollToTop />
      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactUsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopall"
            element={
              <ProtectedRoute>
                <ShopallPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductInfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-success"
            element={
              <ProtectedRoute>
                <PurchaseSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-cancel"
            element={
              <ProtectedRoute>
                <PurchaseCancelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          {/* Public routes not requiring login */}
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>

        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
