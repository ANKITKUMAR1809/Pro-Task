import { useEffect } from "react";
import axios from "axios";
import {errorToast, successToast} from '../utils/toast'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const {setAuthData}= useAuth();

  const handleCallback = async (response) => {
    try {
      // Google returns credential (JWT)
      const token = response.credential;
      console.log("Google JWT:", token);
      // Send token to backend
      const res = await axios.post("http://localhost:3000/api/auth/google", {
        token,
      });

      console.log("LOGIN SUCCESS:", res.data);
      setAuthData(res.data.user, res.data.token);

      successToast("Login Successful!");
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);

    } catch (error) {
      console.error("Google Login Error", error);
      errorToast("Login Failed!!")
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "511652379274-jud1o7v872sjpm0siueimas4lp8opko0.apps.googleusercontent.com",
        callback: handleCallback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        {
          theme: "outline",
          size: "large",
          width: "280",
        }
      );
    }
  }, []);

  return (
    <div>
      <div id="google-login-btn"></div>
    </div>
  );
};

export default GoogleLoginButton;
