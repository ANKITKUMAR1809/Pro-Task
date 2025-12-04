import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiUser,
  FiPlus,
  FiChevronDown,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const DashboardNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const {logout} = useAuth();

  return (
    <nav className="w-full backdrop-blur-md bg-white/40 border-b border-white/20 shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600 tracking-wide">
          ProTask<span className="text-gray-700">.</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-6">

          {/* AI CHAT */}
          <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition">
            <FiMessageCircle size={18} />
            <span>AI Chat</span>
          </button>

          {/* ADD TASK */}
          <button className="hidden sm:flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            <FiPlus size={18} />
            <span>Add Task</span>
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative cursor-pointer">
            <FiBell size={22} className="text-gray-700 hover:text-blue-600 transition" />
            <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
              3
            </span>
          </div>

          {/* MANAGE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setManageOpen(!manageOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
            >
              <FiGrid size={20} />
              <span className="hidden sm:inline">Manage</span>
              <FiChevronDown size={16} />
            </button>

            {manageOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/tasks">Tasks</Link>
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/stats">Stats</Link>
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/settings">Settings</Link>
              </div>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <img
              onClick={() => setProfileOpen(!profileOpen)}
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-600 transition"
            />

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                <Link className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100" to="/profile">
                  <FiUser /> Profile
                </Link>

                <Link className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100" to="/settings">
                  <FiSettings /> Settings
                </Link>

                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600" onClick={logout}>
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
