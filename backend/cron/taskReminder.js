const cron = require("node-cron");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const REMINDER_MAP = {
  "2H": 2 * 60 * 60 * 1000,
  "4H": 4 * 60 * 60 * 1000,
  "6H": 6 * 60 * 60 * 1000,
};

cron.schedule("*/30 * * * *", async () => {
  console.log("⏰ Cron running");

  const now = Date.now();
  const users = await User.find({ remindersEnabled: true });

  for (const user of users) {
    const reminderDelay = REMINDER_MAP[user.reminderIn];
    if (!reminderDelay) continue;

    const pendingTasks = user.tasks.filter((task) => {
      if (task.completed) return false;

      const taskAge = now - new Date(task.createdAt).getTime();
      if (taskAge < reminderDelay) return false;

      if (!task.lastReminded) return true;

      const sinceLastReminder =
        now - new Date(task.lastReminded).getTime();

      return sinceLastReminder >= reminderDelay;
    });

    if (pendingTasks.length === 0) continue;

    const taskList = pendingTasks
      .map((t) => `<li>${t.title} (${t.target})</li>`)
      .join("");

    const emailHTML = `
      <h2>🔔 Task Reminder</h2>
      <p>Hi ${user.name || "User"},</p>
      <p>You have <b>${pendingTasks.length}</b> incomplete task(s):</p>
      <ul>${taskList}</ul>
      <p>Complete them to maintain your streak 🚀</p>
      <small>— Pro Task Team</small>
    `;

    try {
      await transporter.sendMail({
        from: `"Pro Task 🔔" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "⏰ You have pending tasks",
        html: emailHTML,
      });

      // ✅ Update lastReminded for each task
      pendingTasks.forEach((task) => {
        task.lastReminded = new Date(now);
      });

      await user.save();
    } catch (err) {
      console.error("Email failed:", err.message);
    }
  }
});
