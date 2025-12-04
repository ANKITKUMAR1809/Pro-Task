import React, { useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { successToast, infoToast, errorToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {setAuthData} = useAuth();
  const [input, setInput] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: input.email,
        password: input.password,
      });

      const data = res.data;

      if (data.success) {
        setAuthData(data.user, data.token);
        successToast(data.message);
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);
      } else {
        infoToast(data.message);
      }
    } catch (error) {
      console.error("Login Error", error);
      console.log("Backend Error:", error.response?.data);
      errorToast(error.response?.data?.Message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to continue your productivity journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={input.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={input.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
