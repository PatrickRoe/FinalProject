// middleware/authMiddleware.js

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ message: "Access Denied: No Token Provided" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;
