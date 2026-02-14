import axiosAPI from "../API/axiosInstance";

export const submitLogin = async (params) => {
  try {
    const response = await axiosAPI.post("/auth/login", params);
    localStorage.setItem("token", response?.data?.data?.accessToken);
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
