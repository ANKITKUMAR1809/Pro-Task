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
  Intro,
  SettingDashboard,
  TaskDashboard,
  StatDashboard,
  ProfileDashboard,
  Features,
  Contact,
  Pricing
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <-- REQUIRED
import PrivateRoute from "./components/PrivateRoute";
import AddTask from "./components/AddTask";
import StackTask from "./components/StackTask";
import Pomedoro from "./components/Pomedoro";

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
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/verify-otp-save-password/:email"
              element={<VerifyOtpSavePassword />}
            />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route index element={<HomeDashboard />} />
            <Route path="setting" element={<SettingDashboard/>} />
            <Route path="addtask" element={<AddTask/>} />
            <Route path="see-task" element={<StackTask/>} />
            <Route path="pomedaro" element={<Pomedoro/>} />
            <Route path="tasks" element={<TaskDashboard/>} />
            <Route path="stats" element={<StatDashboard/>} />
            <Route path="profile" element={<ProfileDashboard/>} />
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
