// import { create } from "zustand";
// import axios from "../lib/axios";

// const API_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000/api/auth"
//     : "/api/auth";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   error: null,
//   isloading: false,
//   isCheckingAuth: true,
//   message: null,

//   verifyEmail: async (code) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/verify-email`, { code });
//       set({
//         user: response.data.user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       return response.data;
//     } catch (error) {
//       set({
//         error: error.response.data.message || "Error verifying email",
//         isLoading: false,
//       });
//       throw error;
//     }
//   },
// }));








import { create } from "zustand";
import axios from "../lib/axios";  // Make sure axios instance handles baseURL correctly

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,  // Fix typo: isLoading
  isCheckingAuth: true,
  message: null,

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });  // Set loading state to true

    try {
      // Use the axios instance with baseURL already set
      const response = await axios.post("/auth/verify-email", { code });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,  // Reset loading state
      });

      return response.data;  // Return response if needed
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,  // Reset loading state
      });

      throw error;  // Optional: rethrow the error if needed
    }
  },
}));

