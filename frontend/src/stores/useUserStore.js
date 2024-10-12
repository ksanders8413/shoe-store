



import { create } from "zustand";
import axiosInstance from "../lib/axios";
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
      const res = await axiosInstance.post("/auth/signup", { name, email, password });
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
      const res = await axiosInstance.post("/auth/login", { email, password });
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
      await axiosInstance.post("/auth/logout");
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
        const profileRes = await axiosInstance.get("/auth/profile");
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
      const response = await axiosInstance.post("/auth/refresh-token");
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

axiosInstance.interceptors.response.use(
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