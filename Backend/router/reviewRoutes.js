const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const userAuth = require("../middlewares/user-auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// Add a new review for a coach
router.post("/ratings", reviewController.addReview);

// Get all reviews for a specific coach
router.get("/ratings/:coachId", reviewController.getCoachReviews);

// Delete a review
router.delete("/ratings/:reviewId", userAuth, adminMiddleware, reviewController.deleteReview);

module.exports = router;
