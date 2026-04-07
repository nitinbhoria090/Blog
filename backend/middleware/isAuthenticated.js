import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    req.id = decoded.userId;

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};