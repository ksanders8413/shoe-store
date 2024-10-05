import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
// 	withCredentials: true, // send cookies to the server
// });

// export default axiosInstance;





const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development"
	  ? "http://localhost:5000/api"
	  : "https://api.fuegokickz.com/api", // Use full URL if API is on a different domain in production
	withCredentials: true,
  });
  


