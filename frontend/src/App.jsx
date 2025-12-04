import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Login,
  Register,
  VerifyOtpSavePassword,
  Dashboard,
  HomeDashboard,
  Intro
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <-- REQUIRED
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Intro />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/verify-otp-save-password/:email"
              element={<VerifyOtpSavePassword />}
            />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route index element={<HomeDashboard />} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
