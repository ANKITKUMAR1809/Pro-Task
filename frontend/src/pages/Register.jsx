import React, { useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import { infoToast, successToast } from "../utils/toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/send-otp", {
        email
      });

      console.log(res.data);
      // Redirect to verify page with email
      if(res.data.success){
        successToast(res.data.message)
        setTimeout(() => {
          navigate(`/verify-otp-save-password/${email}`)
        }, 2000);
      }
      else{
        infoToast(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-10">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your email to receive a verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Send OTP
          </button>

        </form>

        <div className="flex items-center my-6">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">Or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <GoogleLoginButton />

        <p className="text-center text-gray-600 mt-6">
          Already registered?{" "}
          <a href="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
