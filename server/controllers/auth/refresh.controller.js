import { refreshToken } from "./../../services/auth.service.js";

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    const { accessToken, user } = await refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "New access token issued",
      data: { accessToken, user },
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};
