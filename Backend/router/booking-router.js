const express = require("express");
const router = express.Router();

// Import the correct controller
const emailController = require("../controllers/booking-controller");

// Route to send email
router.post("/send", emailController.sendEmail);

module.exports = router;