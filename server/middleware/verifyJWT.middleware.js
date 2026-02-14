import jwt from "jsonwebtoken";
const { ACCESS_SECRET_KEY } = process.env;

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Missing access token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY);

   
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }
    return res.status(403).json({
      success: false,
      message: "Invalid access token",
    });
  }
};
