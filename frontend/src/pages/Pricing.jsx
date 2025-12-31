import React from "react";

const Pricing = () => {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* Badge */}
        <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
          💳 Pricing
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple pricing, built for focus
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ProTask is currently free while we build the best experience.
            Premium plans are coming soon — designed to stay affordable,
            transparent, and useful.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

          {/* FREE PLAN */}
          <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition text-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Free
            </h3>
            <p className="text-gray-600 mb-6">
              Everything you need to get started and stay productive.
            </p>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              ₹0 <span className="text-base font-medium text-gray-500">/ forever</span>
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✔ Task management</li>
              <li>✔ Daily streak tracking</li>
              <li>✔ Pomodoro focus timer</li>
              <li>✔ Smart reminders</li>
              <li>✔ AI assistant (limited)</li>
            </ul>

            <button
              disabled
              className="w-full py-3 rounded-full bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
            >
              Currently Active
            </button>
          </div>

          {/* PREMIUM PLAN (COMING SOON) */}
          <div className="border-2 border-dashed border-indigo-300 bg-indigo-50/40 rounded-2xl p-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Pro
              </h3>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
                Coming Soon
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              For users who want deeper insights, advanced AI, and full control
              over productivity.
            </p>

            <p className="text-4xl font-bold text-gray-400 mb-6">
              ₹— <span className="text-base font-medium">/ month</span>
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✔ Everything in Free</li>
              <li>✔ Unlimited AI assistance</li>
              <li>✔ Advanced reminders</li>
              <li>✔ Detailed productivity insights</li>
              <li>✔ Priority feature access</li>
            </ul>

            <button
              disabled
              className="w-full py-3 rounded-full bg-indigo-200 text-indigo-600 font-medium cursor-not-allowed"
            >
              Launching Soon 🚀
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-sm text-gray-500 max-w-2xl mx-auto pt-6">
          Early users will receive special benefits when Pro plans launch.
          No sudden pricing. No hidden costs.
        </p>

      </div>
    </section>
  );
};

export default Pricing;
