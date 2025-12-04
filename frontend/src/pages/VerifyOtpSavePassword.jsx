import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { successToast, errorToast, infoToast } from "../utils/toast";

const VerifyOtpSavePassword = () => {
  const { email } = useParams();

  const [form, setForm] = useState({
    otp: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (form.password !== form.confirmPassword) {
      return errorToast("Passwords do not match");
    }

    if (form.password.length < 6) {
      return infoToast("Password must be at least 6 characters");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp-and-save",
        {
          email,
          otp: form.otp,
          name: form.name,
          password: form.password,
        }
      );

      if (res.data.success) {
        successToast(res.data.message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        infoToast(res.data.message);
      }
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Verify Email
        </h2>

        <p className="text-center text-gray-500 mb-6">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* OTP */}
          <div>
            <label className="font-medium text-gray-700">Enter OTP</label>
            <input
              name="otp"
              type="text"
              placeholder="123456"
              value={form.otp}
              onChange={handleChange}
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-blue-400 focus:ring-2 outline-none"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-blue-400 focus:ring-2 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Create Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-blue-400 focus:ring-2 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-blue-400 focus:ring-2 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

      </div>
    </div>
  );
};

export default VerifyOtpSavePassword;
