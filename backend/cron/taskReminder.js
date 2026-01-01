const cron = require("node-cron");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // APP PASSWORD
  },
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
  socketTimeout: 20_000,
});

// Reminder frequency
const REMINDER_MAP = {
  "2H": 2 * 60 * 60 * 1000,
  "4H": 4 * 60 * 60 * 1000,
  "6H": 6 * 60 * 60 * 1000,
};

// Task expiry
const TARGET_MAP = {
  "1D": 1 * 24 * 60 * 60 * 1000,
  "2D": 2 * 24 * 60 * 60 * 1000,
  "3D": 3 * 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
  "2W": 14 * 24 * 60 * 60 * 1000,
};

// 🕐 Runs every 1 hour
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Cron running (hourly)");

  const now = Date.now();
  const users = await User.find({ remindersEnabled: true });

  for (const user of users) {
    const reminderDelay = REMINDER_MAP[user.reminderIn];
    if (!reminderDelay) continue;

    const pendingTasks = user.tasks.filter((task) => {
      if (task.completed) return false;

      const createdAt = new Date(task.createdAt).getTime();
      const taskAge = now - createdAt;

      // ❌ task expired → no reminder
      const targetDuration = TARGET_MAP[task.target];
      if (taskAge > targetDuration) return false;

      // ⏳ too early for reminder
      if (taskAge < reminderDelay) return false;

      // ✅ first reminder
      if (!task.lastReminded) return true;

      // 🔁 repeated reminder
      const sinceLastReminder = now - new Date(task.lastReminded).getTime();

      return sinceLastReminder >= reminderDelay;
    });

    if (pendingTasks.length === 0) continue;

    const taskList = pendingTasks
      .map((t) => `<li>${t.title} (${t.target})</li>`)
      .join("");

    const emailHTML = `
      <h2>🔔 Task Reminder</h2>
      <p>Hi ${user.name || "User"},</p>
      <p>You have <b>${pendingTasks.length}</b> pending task(s):</p>
      <ul>${taskList}</ul>
      <p>Complete them to maintain your streak 🚀</p>
      <small>— Pro Task Team</small>
    `;

    try {
      await transporter.sendMail({
        from: `"Pro Task 🔔" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "⏰ Pending Task Reminder",
        html: emailHTML,
      });

      // update reminder time
      pendingTasks.forEach((task) => {
        task.lastReminded = new Date(now);
      });

      await user.save();
    } catch (err) {
      console.error("Email failed:", err.message);
    }
  }
});
