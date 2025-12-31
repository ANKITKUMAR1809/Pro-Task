import React from "react";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen pt-6 flex items-center justify-center bg-white px-6">
      <div className="max-w-5xl text-center space-y-10">
        {/* Badge */}
        <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
          ✨ Welcome to ProTask
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Plan Smart. <br />
          Stay Focused. <br />
          Build Consistency.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          ProTask is a simple productivity app that helps you manage daily
          tasks, stay focused using proven techniques, and build habits that
          actually last — powered by smart automation and AI.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <Feature text="🎯 Clear task goals & targets" />
          <Feature text="🔔 Smart reminders" />
          <Feature text="🔥 Daily streak tracking" />
          <Feature text="🤖 AI productivity assistant" />
          <Feature text="⏱ Pomodoro focus timer" />
          <Feature text="📈 Progress over perfection" />
        </div>

        {/* CTA */}
        <div className="pt-6">
          <button
            className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
            onClick={() => navigate("/register")}
          >
            Start Using ProTask →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Intro;

/* ================= SMALL COMPONENT ================= */
const Feature = ({ text }) => (
  <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl shadow-sm hover:shadow transition">
    {text}
  </div>
);
