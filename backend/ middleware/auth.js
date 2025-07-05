// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function protect(req, res, next) {
  const auth = req.headers.authorization; // "Bearer token"
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "Not logged in" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Token invalid or expired" });
  }
}
