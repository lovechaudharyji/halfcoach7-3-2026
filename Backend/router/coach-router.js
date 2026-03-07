const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const coachControllers = require("../controllers/coach-controller");
const coachSignupSchema = require("../validators/coach-validators");
const authMiddleware = require("../middlewares/auth-middleware"); // For authentication check
const upload = require("../utils/multer-config");

// Coach Routes
router
  .route("/register")
  .post(
    upload.single("profilePicture"),
    validate(coachSignupSchema),
    coachControllers.coachRegister
  );
router.route("/check-email").post(coachControllers.checkCoachEmailExists);
router.route("/login").post(coachControllers.coachLogin);

router.route("/coaches").get(coachControllers.getAllcoaches);
router.route("/countries").get(coachControllers.getAllCountries);

router.route("/coach").get(coachControllers.getCoachlimit);

router.route("/coaches/:coachId").get(coachControllers.getCoachById);

router
  .route("/profile/:coachId")
  .put(
    authMiddleware,
    upload.single("profilePicture"),
    coachControllers.updateProfile
  );

router
  .route("/profile/:coachId/services")
  .post(authMiddleware, coachControllers.addServices);

router
  .route("/profile/:coachId/services/:serviceId")
  .delete(authMiddleware, coachControllers.removeService);

router
  .route("/profile/:coachId/services")
  .get(authMiddleware, coachControllers.getCoachServices);

router.route("/forgot-password").post(coachControllers.requestPasswordReset);
router
  .route("/reset-password")
  .post(coachControllers.verifyOtpAndResetPassword);
router.route("/featured").get(coachControllers.getFeaturedCoaches);
router.route("/:coachId/feature").patch(coachControllers.toggleFeaturedCoach);


module.exports = router;

