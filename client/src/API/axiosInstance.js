import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3600",
  withCredentials: true, // send HttpOnly refresh token cookie automatically
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        const res = await axios.post(
          "http://localhost:3600/auth/refresh",
          {}, // body can be empty
          { withCredentials: true }, // sends HttpOnly cookie automatically
        );

        const newToken = res.data?.accessToken;
        if (!newToken) throw new Error("No token returned from refresh");

        localStorage.setItem("token", newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
