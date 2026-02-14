import axiosAPI from "../API/axiosInstance";

export const submitLogin = async (params) => {
  try {
    const response = await axiosAPI.post("/auth/login", params);
    localStorage.setItem("token", response?.data?.data?.accessToken);
    localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const submitRegister = async (params) => {
  try {
    const response = await axiosAPI.post("/auth/register", params);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const response = await axiosAPI.get("auth/logout");
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
