const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Otp", otpSchema);