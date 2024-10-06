



// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useUserStore = create((set, get) => ({
//   user: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   isCheckingAuth: true,
//   message: null,

//   signup: async ({ name, email, password, confirmPassword }) => {
//     set({ loading: true, error: null });

//     if (password !== confirmPassword) {
//       set({ loading: false });
//       toast.error("Passwords do not match");
//       set({ error: "Passwords do not match" });
//       return false;
//     }

//     try {
//       const res = await axios.post("/auth/signup", { name, email, password });
//       const { accessToken, refreshToken } = res.data; // Adjust according to your API response
//       set({ user: res.data, isAuthenticated: true, loading: false });
//       localStorage.setItem("user", JSON.stringify(res.data));
//       // Set cookies for tokens if applicable here
//       return true;
//     } catch (error) {
//       set({ loading: false });
//       const errorMessage = error.response?.data?.message || "An error occurred during signup";
//       toast.error(errorMessage);
//       set({ error: errorMessage });
//       return false;
//     }
//   },

//   login: async (email, password) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await axios.post("/auth/login", { email, password });
//       const { accessToken, refreshToken, user } = res.data; // Ensure your API response includes tokens
//       set({
//         isAuthenticated: true,
//         user: res.data,
//         error: null,
//         loading: false,
//       });
//       localStorage.setItem("user", JSON.stringify(res.data));
//       // Set cookies for tokens if applicable here
//     } catch (error) {
//       set({ loading: false, error: error.response?.data?.message });
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("/auth/logout");
//       set({ user: null, isAuthenticated: false });
//       localStorage.removeItem("user");
//       // Clear cookies if applicable here
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred during logout");
//     }
//   },

//   checkAuth: async () => {
//     set({ isCheckingAuth: true, error: null });

//     const storedResponse = JSON.parse(localStorage.getItem("user"));
//     const storedUser = storedResponse?.user;

//     if (storedUser) {
//       set({ user: storedUser, isAuthenticated: true, isCheckingAuth: false });
//     } else {
//       try {
//         const profileRes = await axios.get("/auth/profile");
//         const user = profileRes.data.user;
//         set({ user, isAuthenticated: true, isCheckingAuth: false });
//         localStorage.setItem("user", JSON.stringify(profileRes.data));
//       } catch (error) {
//         console.error("Profile Error:", error);
//         set({ isCheckingAuth: false, isAuthenticated: false });
//         localStorage.removeItem("user");
//       }
//     }
//   },

//   refreshToken: async () => {
//     if (get().isCheckingAuth) return; // Prevent multiple simultaneous refresh attempts

//     set({ isCheckingAuth: true });
//     try {
//       const response = await axios.post("/auth/refresh-token");
//       const { accessToken, refreshToken } = response.data; // Adjust based on your response structure

//       // Update user state with the new access token
//       set({ user: { ...get().user, accessToken }, isCheckingAuth: false });

//       // Optionally store the tokens in cookies or local storage
//       return response.data; // Return the full response if needed
//     } catch (error) {
//       set({ user: null, isCheckingAuth: false });
//       throw error;
//     }
//   },
// }));

// // Axios interceptor for token refresh
// let refreshPromise = null;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (refreshPromise) {
//           await refreshPromise;
//           return axios(originalRequest);
//         }

//         // Start a new refresh process
//         refreshPromise = useUserStore.getState().refreshToken();
//         const { accessToken } = await refreshPromise; // Get the new access token
//         refreshPromise = null;

//         // Update the original request with the new access token
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
//         return axios(originalRequest);
//       } catch (refreshError) {
//         useUserStore.getState().logout(); // Logout on failure
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );










import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true, error: null });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      set({ error: "Passwords do not match" });
      return false;
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      const { accessToken, refreshToken, user } = res.data; // Ensure your API response includes tokens

      set({ user, isAuthenticated: true, loading: false });
      localStorage.setItem("user", JSON.stringify({ accessToken, refreshToken, user }));

      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/auth/login", { email, password });
      const { accessToken, refreshToken, user } = res.data;

      set({ user, isAuthenticated: true, error: null, loading: false });
      localStorage.setItem("user", JSON.stringify({ accessToken, refreshToken, user }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during login";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during logout";
      toast.error(errorMessage);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    const storedResponse = JSON.parse(localStorage.getItem("user"));
    const storedUser = storedResponse?.user;
    
    if (storedUser) {
      set({ user: storedUser, isAuthenticated: true, isCheckingAuth: false });
    } else {
      try {
        const profileRes = await axios.get("/auth/profile");
        const user = profileRes.data.user;

        set({ user, isAuthenticated: true, isCheckingAuth: false });
        localStorage.setItem("user", JSON.stringify({ ...storedResponse, user }));
      } catch (error) {
        set({ isCheckingAuth: false, isAuthenticated: false });
        localStorage.removeItem("user");
        console.error("Profile Error:", error);
      }
    }
  },

  refreshToken: async () => {
    const { isCheckingAuth } = get();
    if (isCheckingAuth) return; // Prevent multiple simultaneous refresh attempts

    set({ isCheckingAuth: true });
    try {
      const response = await axios.post("/auth/refresh-token");
      const { accessToken, refreshToken } = response.data;

      set({
        user: { ...get().user, accessToken },
        isCheckingAuth: false,
      });

      // Update local storage with new tokens
      localStorage.setItem("user", JSON.stringify({ ...get().user, accessToken, refreshToken }));

      return response.data;
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
      localStorage.removeItem("user");
      toast.error("Session expired, please log in again.");
      throw error;
    }
  },
}));

// Axios interceptor for token refresh




let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);