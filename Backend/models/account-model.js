
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
      unique: true,
    },
    bankDetails: {
      bankName: { type: String, default: "" },
      accountNumber: { type: String, default: "" }, // IBAN
      swiftBicCode: { type: String, default: "" },
      bankAddress: {
        city: { type: String, default: "" },
        country: { type: String, default: "" },
      },
      accountHolderName: { type: String, default: "" },
      routingNumber: { type: String, default: "" }, // US
      sortCode: { type: String, default: "" }, // UK
      clabeNumber: { type: String, default: "" }, // Mexico
      ifscCode: { type: String, default: "" }, // India
      bsbCode: { type: String, default: "" }, // Australia
    },
    paypalDetails: {
      email: { type: String, default: "" },
    },
    preferredPayoutMethod: {
      type: String,
      default: "none",
    },
    totalEarning: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;