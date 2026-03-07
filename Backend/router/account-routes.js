
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account-controller.js");

// Account CRUD operations
router.put("/:coachId", accountController.createOrUpdateAccount);
router.get("/:coachId", accountController.getAccountDetails);
router.post("/:coachId/earnings", accountController.updateTotalEarnings);
router.post("/:coachId/reset-earnings", accountController.resetTotalEarnings);
router.get("/:coachId/totalearnings", accountController.getTotalEarnings);


module.exports = router;