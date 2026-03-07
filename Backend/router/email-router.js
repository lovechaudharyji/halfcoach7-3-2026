// routes/emailRoutes.js
const express = require("express");
const router = express.Router();

// Import controller
const emailController = require("../controllers/email-controller");

// Route to send email
router.post("/send", emailController.sendEmail);

module.exports = router;