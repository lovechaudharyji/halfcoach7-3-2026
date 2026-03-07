
const Account = require("../models/account-model.js");
const Coach = require("../models/coach-model");

const createOrUpdateAccount = async (req, res, next) => {
  try {
    const { coachId } = req.params;
    const { bankDetails, paypalDetails, preferredPayoutMethod } = req.body;

    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    if (
      preferredPayoutMethod &&
      !["bank", "paypal", "cash"].includes(preferredPayoutMethod)
    ) {
      return res.status(400).json({ message: "Invalid payout method" });
    }

    if (
      paypalDetails?.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalDetails.email)
    ) {
      return res.status(400).json({ message: "Invalid PayPal email address" });
    }

    // Prepare update object
    const updateData = {
      bankDetails: {
        bankName: bankDetails?.bankName || "",
        accountNumber: bankDetails?.accountNumber || "",
        swiftBicCode: bankDetails?.swiftBicCode || "",
        bankAddress: {
          city: bankDetails?.bankAddress?.city || "",
          country: bankDetails?.bankAddress?.country || "",
        },
        accountHolderName: bankDetails?.accountHolderName || "",
        routingNumber: bankDetails?.routingNumber || "",
        sortCode: bankDetails?.sortCode || "",
        clabeNumber: bankDetails?.clabeNumber || "",
        ifscCode: bankDetails?.ifscCode || "",
        bsbCode: bankDetails?.bsbCode || "",
      },
      paypalDetails: {
        email: paypalDetails?.email || "",
      },
    };

    if (preferredPayoutMethod) {
      updateData.preferredPayoutMethod = preferredPayoutMethod;
    }

    const account = await Account.findOneAndUpdate({ coachId }, updateData, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Account details updated successfully",
      account,
    });
  } catch (error) {
    next(error);
  }
};


// Get account details
const getAccountDetails = async (req, res, next) => {
  try {
    const { coachId } = req.params;

    const account = await Account.findOne({ coachId }).populate(
      "coachId",
      "name email"
    );

    if (!account) {
      return res.status(404).json({
        message: "Account details not found",
        account: {
          coachId,
          bankDetails: {},
          paypalDetails: {},
          taxInformation: {},
          earnings: {},
          payoutSettings: {},
        },
      });
    }

    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

const getTotalEarnings = async (req, res, next) => {
  try {
    const { coachId } = req.params;

    const account = await Account.findOne({ coachId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      totalEarnings: account.totalEarning,
    });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTotalEarnings = async (req, res, next) => {
  try {
    const { coachId } = req.params; // Get coachId from URL params
    const { sessionEarnings } = req.body; // Earnings for the current session

    // Find the coach's account record in the Account model
    const account = await Account.findOne({ coachId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update the total earnings by adding the session earnings
    account.totalEarning += sessionEarnings;

    // Save the updated account record
    await account.save();

    // Send the updated total earnings as a response
    res.status(200).json({ totalEarnings: account.totalEarning });
  } catch (error) {
    console.error("Error updating earnings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetTotalEarnings = async (req, res, next) => {
  try {
    const { coachId } = req.params;

    // Find the coach's account record in the Account model
    const account = await Account.findOne({ coachId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Reset the total earnings to 0
    account.totalEarning = 0;

    // Save the updated account record
    await account.save();

    // Send success response
    res
      .status(200)
      .json({
        message: "Total earnings reset to 0",
        totalEarnings: account.totalEarning,
      });
  } catch (error) {
    console.error("Error resetting total earnings:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createOrUpdateAccount,
  getAccountDetails,
  updateTotalEarnings,
  getTotalEarnings,
  resetTotalEarnings,
};  