
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

// user routes
router.route("/").get(authControllers.home);

router
.route("/register")
.post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/users").get(authControllers.getAllUsers);  // Get all users
router.route("/users/:id").get(authControllers.getUserById);  // Get user by ID

router.route("/forgot-password").post(authControllers.requestPasswordReset);
router.route("/reset-password").post(authControllers.verifyOtpAndResetPassword);

module.exports = router;