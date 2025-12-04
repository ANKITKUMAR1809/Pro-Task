const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: false, // optional because Google/Facebook users may not have a password
    },

    // Google OAuth
    googleId: {
      type: String,
      required: false,
    },

    // Facebook OAuth
    facebookId: {
      type: String,
      required: false,
    },

    // User Tasks Data
    tasks: [
      {
        title: String,
        completed: Boolean,
        points: Number,
        createdAt: Date,
      },
    ],

    // Daily strike (GitHub-like streak)
    strikeCount: {
      type: Number,
      default: 0,
    },
    lastStrikeDate: {
      type: Date,
      required: false,
    },

    // Automatic reminders every few hours
    remindersEnabled: {
      type: Boolean,
      default: true,
    },

    // AI-generated study plan history
    aiPlans: [
      {
        content: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports= mongoose.model("User", userSchema);
