import React from "react";

const Contact = () => {
  return (
    <section className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
            📩 Contact Us
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            We’d love to hear from you
          </h2>

          <p className="text-gray-600 text-lg">
            Have a question, feedback, or feature idea?  
            Reach out — every message helps us make ProTask better.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT INFO */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                Let’s build ProTask together
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ProTask is designed with real users in mind.  
                Whether you’re facing an issue, have a suggestion,
                or just want to say hello — we’re listening.
              </p>
            </div>

            <div className="space-y-4">
              <InfoItem
                title="📧 Email"
                text="support@protask.app"
              />
              <InfoItem
                title="💬 Feedback"
                text="Share ideas, bugs, or improvements"
              />
              <InfoItem
                title="⏱ Response Time"
                text="Usually within 24 hours"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <form className="space-y-5">

              <Input label="Your Name" placeholder="Enter your name" />
              <Input label="Email Address" placeholder="you@example.com" />

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us how we can help you..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
              >
                Send Message →
              </button>

              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. No spam. Ever.
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;

/* ================= SMALL COMPONENTS ================= */

const Input = ({ label, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const InfoItem = ({ title, text }) => (
  <div className="flex items-start gap-3">
    <div className="text-lg">{title}</div>
    <div className="text-gray-600">{text}</div>
  </div>
);
