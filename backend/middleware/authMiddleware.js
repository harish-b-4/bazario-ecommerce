import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ CRITICAL FIX: Fetch MongoDB user
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // ✅ Attach MongoDB user (with _id)
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};

export default authMiddleware;