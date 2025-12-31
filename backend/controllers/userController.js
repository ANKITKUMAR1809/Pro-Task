const User = require("../models/user.model");


// -----------------------------------------------------
// ADD TASK
// -----------------------------------------------------
exports.addTask = async (req, res) => {
  try {
    const { email, task, target } = req.body;

    if (!email || !task || !target) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const newTask = {
      title: task,
      target,
      completed: false,
      createdAt: new Date(),
    };

    user.tasks.push(newTask);

    // Strike system
    const today = new Date().toDateString();
    const lastStrikeDate = user.lastStrikeDate
      ? new Date(user.lastStrikeDate).toDateString()
      : null;

    if (today !== lastStrikeDate) {
      user.strikeCount += 1;
      user.lastStrikeDate = new Date();
    }

    await user.save();

    return res.json({
      success: true,
      message: "Task added successfully!",
      user,
    });
  } catch (error) {
    console.error("Error in addTask:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// -----------------------------------------------------
// SET REMINDER (reminderIn = "2H" | "4H" | "6H")
// -----------------------------------------------------
exports.setReminder = async (req, res) => {
  try {
    const { email, reminderIn } = req.body;

    if (!email || !reminderIn) {
      return res.json({
        success: false,
        message: "Email and reminder type are required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    user.reminderIn = reminderIn; // must match enum

    await user.save();

    return res.json({
      success: true,
      message: "Reminder updated successfully!",
    });
  } catch (error) {
    console.error("Error in setReminder:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




exports.taskCompleted = async (req, res) => {
  try {
    const { email, taskId } = req.body;

    if (!email || !taskId) {
      return res.json({
        success: false,
        message: "Email and taskId are required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    const task = user.tasks.id(taskId);

    if (!task) {
      return res.json({ success: false, message: "Task not found!" });
    }

    task.completed = true;

    await user.save();

    return res.json({
      success: true,
      message: "Task marked as completed!",
      user,
    });
  } catch (error) {
    console.error("Error in taskCompleted:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// -----------------------------------------------------
// DELETE ONE TASK
// -----------------------------------------------------
exports.deleteTask = async (req, res) => {
  try {
    const { email, taskId } = req.body;

    if (!email || !taskId) {
      return res.json({
        success: false,
        message: "Email and taskId are required!",
      });
    }

    const user = await User.findOne({ email }); // make sure you are NOT using .lean()
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    // Find task by id just to check existence (optional)
    const taskExists = user.tasks.some(t => t._id.toString() === taskId);
    if (!taskExists) {
      return res.json({ success: false, message: "Task not found!" });
    }

    // Remove using pull (works with subdocs and plain objects)
    user.tasks.pull(taskId);
    await user.save();

    return res.json({
      success: true,
      message: "Task deleted successfully!",
      user,
    });
  } catch (error) {
    console.error("Error in deleteTask:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};





// -----------------------------------------------------
// DELETE ALL TASKS
// -----------------------------------------------------
exports.deleteAllTask = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    user.tasks = []; // clear array
    await user.save();

    return res.json({
      success: true,
      message: "All tasks deleted successfully!",
      user,
    });
  } catch (error) {
    console.error("Error in deleteAllTask:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { email } = req.body;

    // Check required field
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    // Prepare response
    const allTasks = user.tasks;
    const completed = allTasks.filter(task => task.completed === true);
    const pending = allTasks.filter(task => task.completed === false);

    return res.json({
      success: true,
      message: "Tasks fetched successfully!",
      totalTasks: allTasks.length,
      completedTasks: completed,
      pendingTasks: pending,
    });

  } catch (error) {
    console.error("Error in getAllTasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.getStat = async (req,res)=>{
  try {
    const { email } = req.body;

    // Check required field
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }


    return res.json({
      success: true,
      strikeCount: user.strikeCount,
      lastStrikeDate: user.lastStrikeDate,
      createdAt:user.createdAt,
    });

  } catch (error) {
    console.error("Error in getAllTasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.isReminder = async (req,res)=>{
  try {
    const { email, isReminder } = req.body;

    // Check required field
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }
    
    user.remindersEnabled=isReminder;

    await user.save();
    return res.json({
      success: true,
      message: "Reminder Set Successfully",
    });

  } catch (error) {
    console.error("Error in setReminder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}