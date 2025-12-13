const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/database.util");
require("dotenv").config();
const port = 3000;

const router = require("./routes/gAuth.route");
const emailRouter = require("./routes/email.route");
const userRouter = require("./routes/user.route");

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/auth", emailRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
