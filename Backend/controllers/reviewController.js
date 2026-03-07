
const Review = require("../models/reviewModel");
const Coach = require("../models/coach-model"); // Assuming you have a Coach model

// Add a new review for a coach
exports.addReview = async (req, res) => {
  try {
    const { coachId, userId, rating, reviewText } = req.body;

    // Create a new review
    const newReview = new Review({
      coachId,
      userId,
      rating,
      reviewText,
    });

    // Save the review
    await newReview.save();

    // Optionally, you can calculate average ratings for a coach (if needed)
    const reviews = await Review.find({ coachId });
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Update coach's average rating (if necessary)
    await Coach.findByIdAndUpdate(coachId, { averageRating });

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
};

exports.getCoachReviews = async (req, res) => {
  try {
    const { coachId } = req.params;

    const reviews = await Review.find({ coachId })
      .populate("userId", "username email") // Populate only 'name' and 'email' fields
      .sort({ createdAt: -1 }); // Optional: newest first

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this coach" });
    }

    // Optionally format reviews for better readability
    const formattedReviews = reviews.map((review) => ({
      _id: review._id,
      rating: review.rating,
      reviewText: review.reviewText,
      createdAt: review.createdAt,
      user: {
        _id: review.userId._id,
        username: review.userId.username,
        email: review.userId.email,
      },
    }));

    res.status(200).json({ reviews: formattedReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review" });
  }
};