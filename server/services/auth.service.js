import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

// ? REGISTER
export const registerUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.trim().length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return user;
};

// ? LOGIN

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Username and email are required");
  }

  // find user in MongoDB
  const user = await User.findOne({ email , }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  // check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Incorrect password");
  }

  // generate JWT tokens
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "1d",
  });

  // save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, username: user.username, role: user.role },
  };
};

// ? LGGOUT

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  // find the user with this refresh token
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return null;
  }

  // remove refresh token
  user.refreshToken = null;
  await user.save();

  return user;
};

// ? REFRESH TOKEN

export const refreshToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Refresh token missing");

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  // Find user with this refresh token in DB
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("User not found");

  // Issue new access token
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });

  return {
    accessToken,
    user: { id: user._id, email: user.email, role: user.role },
  };
};
