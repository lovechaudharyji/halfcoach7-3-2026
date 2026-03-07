const mongoose = require("mongoose");

// Define Email Schema
const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Check if the Email model already exists to prevent overwriting
const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

module.exports = Email;