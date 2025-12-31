const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    },

    googleId: String,
    facebookId: String,

    tasks: [
      {
        title: String,

        target: {
          type: String,
          enum: ["1D", "2D", "3D", "1W", "2W"],
          required: true,
        },

        completed: {
          type: Boolean,
          default: false,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
        lastReminded: Date,
      },
    ],

    strikeCount: {
      type: Number,
      default: 0,
    },

    lastStrikeDate: Date,

    remindersEnabled: {
      type: Boolean,
      default: false,
    },
    reminderIn: {
      type: String,
      enum: ["2H", "4H", "6H"],
    },
    membership: {
      type: String,
      enum: ["free", "upgraded"],
      default:"free"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
