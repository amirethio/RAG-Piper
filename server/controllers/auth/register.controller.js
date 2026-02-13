import { registerUser } from "./../../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "registered sucessfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
