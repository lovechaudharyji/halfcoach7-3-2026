// // models/coach-model.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const coachSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     coachType: {
//       type: String,
//       required: true,
//     },

//     country: {
//       type: String,
//       required: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },
//     otp: {
//       type: String,
//       required: false,
//     },
//     otpExpiration: {
//       type: Date,
//       required: false,
//     },
//     experience: { type: String, default: "" },
//     qualifications: { type: String, default: "" },
//     languages: { type: [String], default: ["English"] },
//     specialization: { type: String, default: "" },
//     availability: { type: String, default: "" },
//     hourlyRate: { type: Number, default: 0 },
//     phoneNumber: { type: String, default: "" },
//     address: { type: String, default: "" },
//     city: { type: String, default: "" },
//     state: { type: String, default: "" },
//     zipCode: { type: String, default: "" },
//     socialMediaLinks: { type: [String], default: [] },
//     certifications: { type: [String], default: [] },
//     bio: { type: String, default: "" },
//     profilePicture: { 
//        data: Buffer,
//     contentType: String,
    
//     }, // URL or file path
//     website: { type: String, default: "" },
//     additionalNotes: { type: String, default: "" },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//     services: [
//       {
//         duration: { type: String, required: true },
//         price: { type: Number, required: true },
//         description: { type: String, default: "" },
//       },
//     ],
//     sessions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Session", // Reference to the Session model
//       },
//     ],
//   },
//   { timestamps: true }
// );

// coachSchema.pre("save", async function (next) {
//   const coach = this;

//   if (!coach.isModified("password")) {
//     return next();
//   }

//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(coach.password, saltRound);
//     coach.password = hashPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// coachSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// coachSchema.methods.generateToken = async function () {
//   try {
//     return jwt.sign(
//       {
//         coachId: this._id.toString(),
//         email: this.email,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "30d",
//       }
//     );
//   } catch (error) {
//     throw new Error("Token generation failed");
//   }
// };

// const Coach = mongoose.model("Coach", coachSchema);

// module.exports = Coach;

// models/coach-model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    coachType: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiration: {
      type: Date,
      required: false,
    },
    experience: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    languages: { type: [String], default: ["English"] },
    specialization: { type: String, default: "" },
    availability: { type: String, default: "" },
    hourlyRate: { type: Number, default: 0 },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    socialMediaLinks: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" }, // URL or file path
    website: { type: String, default: "" },
    additionalNotes: { type: String, default: "" },
    featured: {
      type: Boolean,
      default: false,
    },
    services: [
      {
        duration: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, default: "" },
      },
    ],
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session", // Reference to the Session model
      },
    ],
  },
  { timestamps: true }
);

coachSchema.pre("save", async function (next) {
  const coach = this;

  if (!coach.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(coach.password, saltRound);
    coach.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

coachSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

coachSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        coachId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

const Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;