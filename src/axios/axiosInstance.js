import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API's base URL
  timeout: 10000, // You can set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      // Get the token from local storage or any other storage method
      const token = localStorage.getItem("authToken");
      if (token) {
        // If the token is available and Authorization header isn't set, add it to the headers
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Optional: You can set up response interceptors for handling errors globally
// axiosInstance.interceptors.response.use(...)

export default axiosInstance;
