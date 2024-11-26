import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, adminCode } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Validate password strength (optional)
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    // Determine role based on adminCode
    let role = "user"; // Default role
    if (adminCode === process.env.ADMIN_INVITE_CODE) {
      role = "admin"; // Promote to admin role if code matches
    } else if (adminCode) {
      return res.status(403).json({ message: "Invalid admin code!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const createdUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    await createdUser.save();

    // Generate a token and send a response
    generateTokenAndSetCookie(res, createdUser._id);

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      generateTokenAndSetCookie(res, user._id);
      res.status(200).json({
        message: "Login Successful",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error:" + error.mesage);
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
  console.log("Logged out successfully");
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
