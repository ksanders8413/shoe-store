import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import FloatingShape from "../Components/FloatingShape";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const { login, loading, error } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    login(email, password);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <FloatingShape
        color="bg-gradient-to-t from-green-950 via-green-800 via-blue-700 via-green-600 to-green-400"
        size="w-56 h-56"
        top="7%"
        left="5%"
        delay={2}
      />
      <FloatingShape
        color="bg-gradient-to-t from-green-950 via-green-800 via-green-700 via-green-600 to-green-400"
        size="w-48 h-48"
        top="50%"
        left="70%"
        delay={2}
      />
      <FloatingShape
        color="bg-gradient-to-t from-green-950 via-green-800 via-green-700 via-green-600 to-green-400"
        size="w-32 h-32"
        top="60%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-gradient-to-t from-green-950 via-green-800 via-green-700 via-green-600 to-green-400"
        size="w-32 h-32"
        top="15%"
        left="65%"
        delay={0}
      />
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Log in
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shawdow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="kevin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shawdow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="******"
                />
              </div>
            </div>
            <div className="flex items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border bordeer-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50 "
              disabled={loading}
            >
             {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
