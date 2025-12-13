const express = require("express");
const userRouter = express.Router();
const {
  addTask,
  setReminder,
  taskCompleted,
  deleteAllTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/userController");

userRouter.post("/add-task", addTask);
userRouter.post("/set-reminder", setReminder);
userRouter.post("/mark-complete", taskCompleted);
userRouter.post("/delete-task", deleteTask);
userRouter.post("/delete-all-task", deleteAllTask);
userRouter.post("/get-all-tasks", getAllTasks);

module.exports = userRouter;
