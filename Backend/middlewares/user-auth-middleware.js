const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = userAuthMiddleware;
