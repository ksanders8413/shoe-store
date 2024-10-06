// import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
// 	withCredentials: true, // send cookies to the server
// });

// export default axiosInstance;



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_BACKEND_URL_PROD,
  withCredentials: true, // Send cookies to the server
});

export default axiosInstance;
