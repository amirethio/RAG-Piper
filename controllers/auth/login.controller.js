import { loginUser } from "./../../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await loginUser(req.body);

    console.log(accessToken, refreshToken, user);
    
    // * setting refresh token to cookie

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        accessToken,
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
