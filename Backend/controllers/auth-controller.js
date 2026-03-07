const User = require("../models/user-model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to00000 world of love chaudhary gym");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }
    //hashing password
    //const saltRound = 10;
    //const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password, //: hash_password,
    });

    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.staus(500).json("internal server error");
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const user = await userExist.comparePassword(password); // Compare the password

    if (user) {
      res.status(201).json({
        msg: "Login Successful",
        username: userExist.username,
        email: userExist.email,
        phone: userExist.phone,
        isAdmin: userExist.isAdmin || false,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    console.log(error); // This will log the error to the console
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Error fetching user", error})
    }
}

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can change it according to your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${otp}. This OTP is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP and expiration time in the user document
    user.otp = otp;
    user.otpExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if OTP exists and is valid
    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpiration) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Reset the user's password
    user.password = newPassword;
    user.otp = null; // Clear OTP after successful reset
    user.otpExpiration = null; // Clear OTP expiration time
    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = {
  home,
  register,
  login,
  getAllUsers,
  getUserById,
  requestPasswordReset,
  verifyOtpAndResetPassword,
};
