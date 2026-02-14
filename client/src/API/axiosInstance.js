import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3600",
  withCredentials: true,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access tokens (401 from backend)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 401 && message === "Access token expired") {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            "http://localhost:3600/auth/refresh",
            {},
            { withCredentials: true },
          );
          const newToken = res.data?.data?.accessToken;
          if (!newToken)
            throw new Error("No access token returned from refresh");
          localStorage.setItem("token", newToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
