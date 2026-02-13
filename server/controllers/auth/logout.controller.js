import { logoutUser } from "./../../services/auth.service.js";

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const user = await logoutUser(refreshToken);

    // clear cookie anyway
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message || "Invalid or expired token",
    });
  }
};
