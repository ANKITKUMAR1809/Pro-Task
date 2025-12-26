import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const DashboardNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <nav className=" w-full backdrop-blur-md bg-white/40 border-b border-white/20 shadow-lg z-[10000]">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <Link
            to="/dashboard"
            className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
          >
            ProTask
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-6">
          {/* MANAGE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => {
                setManageOpen(!manageOpen);
                setProfileOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
            >
              <FiGrid size={20} />
              <span className="hidden sm:inline">Manage</span>
              <FiChevronDown size={16} />
            </button>

            {manageOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[10001]">
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  to="/dashboard/tasks"
                >
                  Tasks
                </Link>
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  to="/dashboard/stats"
                >
                  Stats
                </Link>
              </div>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <img
              onClick={() => {
                setProfileOpen(!profileOpen);
                setManageOpen(false);
              }}
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-600 transition"
            />

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[10001]">
                <Link
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  to="/dashboard/profile"
                >
                  <FiUser /> Profile
                </Link>

                <Link
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  to="/dashboard/setting"
                >
                  <FiSettings /> Settings
                </Link>

                <button
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                  onClick={logout}
                >
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
