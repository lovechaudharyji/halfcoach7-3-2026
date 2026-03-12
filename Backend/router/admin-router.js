const express = require("express");
const deleteUserById = require("../controllers/admin-condelet");
const getUserByID = require("../controllers/admin-conedit");
const deleteCoachById = require("../controllers/admin-coachdelet");
const adminMiddleware = require("../middlewares/admin-middleware");
const userAuth = require("../middlewares/user-auth-middleware");
const upload = require("../utils/multer-config");
const {
  updateCoachByAdmin,
  updateServicesByAdmin,
  setFeaturedByAdmin,
  updateSessionByAdmin,
} = require("../controllers/admin-coach-edit");
const reviewController = require("../controllers/reviewController");
const adminOrCoach = require("../middlewares/admin-or-coach-middleware");
const adminUiAuth = require("../middlewares/admin-ui-auth-middleware");
const router = express.Router();

router.route('/users/:id').get( getUserByID);

router.route("/users/delete/:id").delete(deleteUserById);

router.route("/coachs/delete/:id").delete(deleteCoachById);

router
  .route("/coachs/:id")
  .put(adminUiAuth, adminMiddleware, upload.single("profilePicture"), updateCoachByAdmin);

router
  .route("/coachs/:id/services")
  .put(adminUiAuth, adminMiddleware, updateServicesByAdmin);

router
  .route("/coachs/:id/feature")
  .patch(adminUiAuth, adminMiddleware, setFeaturedByAdmin);

router
  .route("/sessions/:sessionId")
  .put(adminUiAuth, adminMiddleware, updateSessionByAdmin);

router.route("/reviews/:reviewId").delete(adminOrCoach, reviewController.deleteReview);

module.exports = router;
