const Coach = require("../models/coach-model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Coach Registration
const coachRegister = async (req, res) => {
  try {
    const { name, email, coachType, country, password } = req.body;

    const coachExist = await Coach.findOne({ email });

    if (coachExist) {
      return res.status(400).json({ msg: "Coach email already exists" });
    }

    let profilePictureUrl = "";
    if (req.file) {
      profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    const coachCreated = await Coach.create({
      name,
      email,
      coachType,
      country,
      password,
      profilePicture: profilePictureUrl,
    });

    res.status(201).json({
      msg: "Coach registration successful",
      token: await coachCreated.generateToken(),
      coachId: coachCreated._id.toString(),
    });
  } catch (error) {
    //next(error);
  }
};

const checkCoachEmailExists = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Email is required" });

  try {
    const coach = await Coach.findOne({ email });
    if (coach) {
      return res
        .status(409)
        .json({ msg: "Coach with this email already exists" });
    }
    return res.status(200).json({ msg: "Email is available" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error checking email", error: error.message });
  }
};

// Coach Login
const coachLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const coachExist = await Coach.findOne({ email });

    if (!coachExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const coach = await coachExist.comparePassword(password);

    if (coach) {
      const token = await coachExist.generateToken();
      res.status(200).json({
        msg: "Coach Login Successful",
        token,
        coachId: coachExist._id.toString(),
        name: coachExist.name,
        email: coachExist.email,
        coachType: coachExist.coachType,
        profilePicture: coachExist.profilePicture,
        country: coachExist.country,
        experience: coachExist.experience,
        qualifications: coachExist.qualifications,
        languages: coachExist.languages,
        services: coachExist.services,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const path = require("path");
const fs = require("fs");

const updateProfile = async (req, res) => {
  try {
    const { coachId } = req.params;
    const authCoach = req.coach._id.toString();

    if (coachId !== authCoach) {
      return res.status(403).json({ message: "This is NOT your profile" });
    }

    const {
      name,
      email,
      coachType,
      country,
      experience,
      qualifications,
      languages,
      specialization,
      availability,
      hourlyRate,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      socialMediaLinks,
      certifications,
      bio,
      website,
      additionalNotes,
    } = req.body;

    let profilePictureUrl = "";
    if (req.file) {
      profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    const existingCoach = await Coach.findById(coachId);
    if (!existingCoach) {
      return res.status(404).json({ message: "Coach with this ID not found" });
    }

    // If the email is updated, check for duplicates
    if (email && email !== existingCoach.email) {
      const coachWithEmail = await Coach.findOne({ email });
      if (coachWithEmail) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    // Delete the old profile picture if there is a new one
    if (profilePictureUrl && existingCoach.profilePicture) {
      const oldProfilePicturePath = path.join(
        __dirname,
        "..",
        existingCoach.profilePicture
      );
      // Check if the old image file exists and delete it
      fs.unlink(oldProfilePicturePath, (err) => {
        if (err) {
          console.error("Error deleting old profile picture:", err);
        }
      });
    }

    // Update the coach profile
    const updateCoach = await Coach.findByIdAndUpdate(
      coachId,
      {
        name,
        email,
        coachType,
        country,
        experience,
        qualifications,
        languages,
        specialization,
        availability,
        hourlyRate,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        socialMediaLinks,
        certifications,
        bio,
        profilePicture: profilePictureUrl || existingCoach.profilePicture,
        website,
        additionalNotes,
      },
      { new: true, runValidators: true }
    );

    if (!updateCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      coach: updateCoach,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getCoachProfile = async (req, res) => {
  try {
    const coachId = req.user.coachId;
    const coach = await Coach.findById(coachId);

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllcoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().sort({ createdAt: -1 });

    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: "No coaches found" });
    }
    res.status(200).json(coaches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error while fetching Coaches", error });
  }
};

const getAllCountries = async (req, res) => {
  try {
    const countries = await Coach.distinct("country"); // Get distinct countries
    res.status(200).json(countries); // Return an array of country names
  } catch (error) {
   console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCoachlimit = async (req, res) => {
  try {
    // Extract page and limit from query params with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 9; // Default to 10 items per page

    // Calculate the skip value based on page number and limit
    const skip = (page - 1) * limit;

    // Fetch the paginated coaches data
    const coaches = await Coach.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Count the total number of coaches for pagination purposes
    const totalCoaches = await Coach.countDocuments();

    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: "No coaches found" });
    }

    // Send the paginated response
    res.status(200).json({
      coaches,
      totalCoaches,
      totalPages: Math.ceil(totalCoaches / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error while fetching Coaches", error });
  }
};

const getCoachById = async (req, res) => {
  try {
    const { coachId } = req.params; // Get the coach ID from the route parameter
    const coach = await Coach.findById(coachId); // Find coach by ID

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const addServices = async (req, res) => {
  try {
    const { coachId } = req.params;
    const authCoach = req.coach._id.toString();

    if (coachId !== authCoach) {
      return res.status(403).json({ message: "This is not your profile" });
    }

    const { services } = req.body;

    // Validate the services array
    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: "Services data is required" });
    }

    // Validate each service object
    for (const service of services) {
      if (!service.duration || !service.price) {
        return res
          .status(400)
          .json({ message: "Service must include duration and price" });
      }
    }

    // Check if the coach already has 5 services
    const coach = await Coach.findById(coachId);
    if (coach.services.length + services.length > 5) {
      return res
        .status(400)
        .json({ message: "You can only have up to 5 services" });
    }

    // Add new services to the existing coach's services array
    const updatedCoach = await Coach.findByIdAndUpdate(
      coachId,
      { $push: { services: { $each: services } } }, // Adds the new services without replacing the old ones
      { new: true, runValidators: true }
    );

    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      message: "Services added successfully",
      coach: updatedCoach,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const removeService = async (req, res) => {
  try {
    const { coachId, serviceId } = req.params;
    const authCoach = req.coach._id.toString();

    if (coachId !== authCoach) {
      return res.status(403).json({ message: "This is not your profile" });
    }

    const updatedCoach = await Coach.findByIdAndUpdate(
      coachId,
      { $pull: { services: { _id: serviceId } } }, // Removing a specific service by ID
      { new: true }
    );

    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      message: "Service removed successfully",
      coach: updatedCoach,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCoachServices = async (req, res) => {
  try {
    const { coachId } = req.params; // Get the coach ID from the route parameter
    const coach = await Coach.findById(coachId).select("services"); // Only fetch the services

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Return the services
    res.status(200).json({
      services: coach.services,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "HalfCoach OTP",
    text: `Your OTP for password reset is ${otp}. This OTP is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
   console.log("Error sending OTP email:", error);
    throw new Error(`Error sending OTP email: ${error.message}`);
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const coachExist = await Coach.findOne({ email });
    if (!coachExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP and expiration time in the user document
    coachExist.otp = otp;
    coachExist.otpExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await coachExist.save();

    // Send OTP to user's email
    await sendOtpEmail(email, otp);

    res.status(200).json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const coachExist = await Coach.findOne({ email });
    if (!coachExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if OTP exists and is valid
    if (coachExist.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (Date.now() > coachExist.otpExpiration) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Reset the user's password
    coachExist.password = newPassword;
    coachExist.otp = null; // Clear OTP after successful reset
    coachExist.otpExpiration = null; // Clear OTP expiration time
    await coachExist.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
const getFeaturedCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find({ featured: true });
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured coaches", error });
  }
};
const toggleFeaturedCoach = async (req, res) => {
  const { coachId } = req.params;
  const { featured } = req.body;

  try {
    const coach = await Coach.findByIdAndUpdate(
      coachId,
      { featured },
      { new: true }
    );

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      message: `Coach has been ${
        featured ? "featured" : "unfeatured"
      } successfully.`,
      coach,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating featured status", error });
  }
};

module.exports = {
  coachRegister,
  coachLogin,
  getCoachProfile,
  getAllcoaches,
  getCoachById,
  updateProfile,
  addServices,
  removeService,
  getCoachServices,
  getCoachlimit,
  requestPasswordReset,
  verifyOtpAndResetPassword,
  getAllCountries,
  checkCoachEmailExists,
  getFeaturedCoaches,
  toggleFeaturedCoach,
};