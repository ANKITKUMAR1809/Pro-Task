import React from "react";
import aiImg from "../assets/ai.png";
import homeImg from "../assets/home.png";
import pomoImg from "../assets/pomo.png";
import reminderImg from "../assets/reminder.png";
import streakImg from "../assets/streak.png";
const Features = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything you need to stay productive
          </h2>
          <p className="text-gray-600 text-lg">
            ProTask combines task management, focus tools, and habit-building
            systems into one simple, distraction-free workspace.
          </p>
        </div>

        {/* ================= FEATURE 1 ================= */}
        <FeatureBlock
          title="Smart Task Management"
          subtitle="Clarity before productivity"
          description="ProTask helps you break your work into clear, actionable tasks with defined goals. 
          No clutter. No confusion. Just simple tasks that move you forward every day."
          points={[
            "Create tasks with clear targets (daily, weekly, custom)",
            "Track pending and completed tasks separately",
            "Instant updates with no page reloads",
            "Clean, scroll-based task lists for focus",
          ]}
          img={homeImg}
          icon="🎯"
        />

        {/* ================= FEATURE 2 ================= */}
        <FeatureBlock
          reverse
          title="Daily Streak System"
          subtitle="Consistency beats motivation"
          description="Staying consistent is harder than starting. ProTask’s streak system rewards
          progress, not perfection — helping you build habits that actually stick."
          points={[
            "GitHub-style daily streak tracking",
            "Automatic streak updates on task completion",
            "Visual motivation to keep going every day",
            "Designed to reduce burnout, not increase pressure",
          ]}
          img={streakImg}
          icon="🔥"
        />

        {/* ================= FEATURE 3 ================= */}
        <FeatureBlock
          title="AI Productivity Assistant"
          subtitle="Think less. Do more."
          description="Not sure what to work on next? Let ProTask’s AI help you plan smarter,
          prioritize better, and stay focused when your mind feels overloaded."
          points={[
            "AI-powered task suggestions",
            "Help planning daily or weekly goals",
            "Instant clarity when you feel stuck",
            "Designed to assist, not overwhelm",
          ]}
          img={aiImg}
          icon="🤖"
        />

        {/* ================= FEATURE 4 ================= */}
        <FeatureBlock
          reverse
          title="Pomodoro Focus Mode"
          subtitle="Deep work, simplified"
          description="Focus deeply without distractions using the built-in Pomodoro timer.
          ProTask helps you work in short, effective sessions that protect your energy."
          points={[
            "25-minute focus sessions",
            "Short breaks to avoid burnout",
            "Minimal, distraction-free design",
            "Perfect for study, coding, or deep work",
          ]}
          img={pomoImg}
          icon="⏱"
        />

        {/* ================= FEATURE 5 ================= */}
        <FeatureBlock
          title="Smart Reminders"
          subtitle="Never forget what matters"
          description="Life gets busy — ProTask ensures your important tasks don’t get lost.
          Smart reminders gently nudge you at the right time."
          points={[
            "Custom reminder intervals",
            "No spam, only meaningful alerts",
            "Stay on track without stress",
            "Designed for real-life schedules",
          ]}
          img={reminderImg}
          icon="🔔"
        />

        {/* ================= FEATURE 6 ================= */}
        <FeatureBlock
          reverse
          title="Clean & Calm Design"
          subtitle="Designed for focus, not distraction"
          description="Every pixel in ProTask is designed to reduce cognitive load.
          The light theme, spacing, and typography help you think clearly."
          points={[
            "Light, distraction-free UI",
            "No unnecessary animations",
            "Smooth scrolling & responsive layout",
            "Feels calm, even on busy days",
          ]}
          img={homeImg}
          icon="✨"
        />

        {/* ================= FINAL CTA ================= */}
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Build progress, one focused day at a time
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ProTask isn’t about doing everything. It’s about doing the right
            things — consistently.
          </p>
          <button className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md">
            Start Using ProTask →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;

/* ================= REUSABLE BLOCK ================= */
const FeatureBlock = ({
  title,
  subtitle,
  description,
  points,
  icon,
  img,
  reverse = false,
}) => (
  <div
    className={`flex flex-col ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    } items-center gap-12`}
  >
    {/* Text */}
    <div className="flex-1 space-y-4">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
      <p className="text-indigo-600 font-medium">{subtitle}</p>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      <ul className="space-y-2 pt-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-700">
            <span className="text-indigo-500 mt-1">✔</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Visual Card */}
    <div className="flex-1 w-full">
      <div className="bg-black/30 border border-gray-200 rounded-2xl shadow-lg p-6 h-64 overflow-hidden flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  </div>
);
