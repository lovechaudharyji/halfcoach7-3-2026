// backend/routes/booking.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Create a Booking model (you can adjust this to your actual model)
const Booking = mongoose.model("Booking", new mongoose.Schema({
  coachId: String,
  userId: String,
  sessionDuration: String,
  sessionPrice: String,
  sessionDescription: String,
  sessionId: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
}));

router.post("/save", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).json({ message: "Booking saved ✅", booking });
  } catch (err) {
    console.error("Booking save error:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

module.exports = router;
