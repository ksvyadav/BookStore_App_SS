import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifySessionToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    // Attach userId to the request object
    req.userId = decoded.userId;

    // Fetch user data to check role
    const user = await User.findById(req.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user; // Attach user details to the request object

    // Optional role check for admin
    if (
      req.requiredRole &&
      req.requiredRole === "admin" &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Error in verifySessionToken middleware:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
