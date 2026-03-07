const jwt = require("jsonwebtoken");
const Coach = require("../models/coach-model"); // Adjust path if necessary

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const tokenPart = token.split(" ")
        if(tokenPart.length !== 2 || tokenPart[0] !== "Bearer"){
            return res.status(401).json({message: "Unauthorized: Invalid token format"})
        }

        const decoded = jwt.verify(tokenPart[1], process.env.JWT_SECRET_KEY);
        console.log("Decoded token: ", decoded);
        req.coach = await Coach.findById(decoded.coachId).select("-password");

        if (!req.coach) {
            return res.status(401).json({ message: "Coach not found" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
