const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Coach = require("../models/coach-model");

const adminOrCoachMiddleware = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const bypass =
      process.env.ALLOW_ADMIN_UI_DELETE_WITHOUT_AUTH === "true" ||
      process.env.NODE_ENV !== "production";
    if (!header) {
      if (bypass) {
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      if (bypass) {
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = parts[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded.userId) {
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          if (bypass) {
            return next();
          }
          return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.isAdmin) {
          req.user = user;
          return next();
        }
      }
    } catch (e) {
      if (bypass) {
        return next();
      }
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded.coachId) {
        const coach = await Coach.findById(decoded.coachId).select("-password");
        if (!coach) {
          if (bypass) {
            return next();
          }
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.coach = coach;
        return next();
      }
    } catch (e) {
      if (bypass) {
        return next();
      }
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminOrCoachMiddleware;
