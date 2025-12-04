const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ------------------------------------
// 1️⃣ SEND OTP
// ------------------------------------
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    const user = await User.findOne({ email });

    // If user already exists (password or Google login)
    if (user && (user.password || user.googleId)) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Email send
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for ProTask",
      text: `Your OTP is: ${otp} (valid for 5 minutes)`,
    });

    // Save OTP (create or update)
    await Otp.findOneAndUpdate(
      { email },
      {
        $set: {
          otp: hashedOtp,
          otpExpires,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------------------------
// 2️⃣ VERIFY OTP + SAVE PASSWORD + SAVE NAME
// ------------------------------------
exports.verifyOtpAndSavePass = async (req, res) => {
  try {
    const { email, otp, password, name } = req.body;

    if (!email || !otp || !password || !name) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find OTP entry
    const otpEntry = await Otp.findOne({ email });

    if (!otpEntry) {
      return res.json({
        success: false,
        message: "OTP not found. Please request again.",
      });
    }

    // Check expiry
    if (Date.now() > otpEntry.otpExpires) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    // Validate OTP
    const isValid = await bcrypt.compare(otp.toString(), otpEntry.otp);
    if (!isValid) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Remove OTP after verification
    await otpEntry.deleteOne();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DB
    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------------------------
// 3️⃣ EMAIL PASSWORD LOGIN
// ------------------------------------
exports.emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({
        success: false,
        message: "Email and password are required",
      });

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.json({
        success: false,
        message: "User not found or registered via Google",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.verifyMe = async (req, res) => {
  try {
    let token;

    // Read Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("Verified User:", user);
    // SUCCESS RESPONSE ✔
    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Verify Token Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
