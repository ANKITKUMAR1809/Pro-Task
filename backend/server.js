const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./utils/database.util");

const router = require("./routes/gAuth.route");
const emailRouter = require("./routes/email.route");
const userRouter = require("./routes/user.route");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/auth", emailRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  await connectDB();

  // 🔥 START CRON AFTER DB CONNECTS
  require("./cron/taskReminder");

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
