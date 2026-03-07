//controllers/email-controller.js
const nodemailer = require("nodemailer");
const Email = require("../models/email-model");

// Set up the transporter using Gmail (You can use another provider too)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true, // Enable logging
  debug: true, // Enable debugging
});

// Controller to send an email
const sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  // Set up email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: message,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Save email to MongoDB
    const newEmail = new Email({
      to,
      subject,
      message,
    });

    await newEmail.save();

    // Respond with success message
    res.status(200).json({ message: "Email sent and saved to database!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

module.exports = { sendEmail };