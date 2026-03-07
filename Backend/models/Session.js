const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach", // Reference to the Coach model
    required: true,
  },
  sessionDate: {
    type: Date,
    default: Date.now,
  },
  serviceDuration: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  meetingLink: String,
});

module.exports = mongoose.model("Session", sessionSchema);