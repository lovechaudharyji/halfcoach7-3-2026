const express = require("express");
const deleteUserById = require("../controllers/admin-condelet");
const getUserByID = require("../controllers/admin-conedit");
const deleteCoachById = require("../controllers/admin-coachdelet");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

router.route('/users/:id').get( getUserByID);

router.route("/users/delete/:id").delete(deleteUserById);

router.route("/coachs/delete/:id").delete(deleteCoachById);

module.exports = router;