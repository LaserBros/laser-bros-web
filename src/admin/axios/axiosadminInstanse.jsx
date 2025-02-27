import axios from "axios";

// Create an instance of axios
const axiosAdminInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/admin", // Replace with your API's base URL
  timeout: 1000000, // You can set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosAdminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    const refresh_token = localStorage.getItem("refreshToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/refresh`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const { token } = response.data.data;
    localStorage.setItem("adminToken", token);
    // // console.log(response.data, "sasas");
    return token;
  } catch (error) {
    if (error.response.data.status_code === 401) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("full_name");
      localStorage.removeItem("email");
      window.location.href = "/Login";
    }
    throw new Error("Failed to refresh token");
  }
};

// Add a response interceptor to handle token expiration
axiosAdminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure
        console.error("Token refresh failed:", refreshError);
        // Redirect to login or handle as needed
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdminInstance;
