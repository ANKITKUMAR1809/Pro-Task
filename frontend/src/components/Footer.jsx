import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-4">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">
              ProTask
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A smart productivity app designed to help you focus better,
              manage tasks efficiently, and build long-lasting habits with
              consistency.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Task Management</li>
              <li>Daily Streaks</li>
              <li>Smart Reminders</li>
              <li>Pomodoro Timer</li>
              <li>AI Assistant</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>About ProTask</li>
              <li>Roadmap</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">
              Stay Productive
            </h4>
            <p className="text-gray-600 text-sm">
              Start organizing your day and build consistency with ProTask.
            </p>
            <button className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shadow-sm" onClick={()=>navigate("/register")}>
              Get Started →
            </button>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} ProTask. All rights reserved.
          </p>
          <p>
            Built with ❤️ for focus & consistency
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
