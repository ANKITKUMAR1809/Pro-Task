import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; 
import { successToast, errorToast, infoToast } from "../utils/toast";

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();

  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [strikeCount, setStrikeCount] = useState(0);
  const [loading, setLoading] = useState(true);


  const fetchTasks = async () => {
    try {
      if (!user?.email) return;
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/user/get-all-tasks", {
        email: user.email,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }
      setCompletedTasks(res.data.completedTasks);
      setIncompleteTasks(res.data.pendingTasks);
      setStrikeCount(res.data.strikeCount);
      setLoading(false);

    } catch (err) {
      console.error("Fetch tasks error:", err);
      errorToast("Something went wrong fetching tasks");
    }
  };

  // Fetch tasks whenever user logs in
  useEffect(() => {
    if (user?.email) fetchTasks();
  }, [user]);

  const addTask = async (task, target) => {
    if (!task || !target) {
      infoToast("Task and Target are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/user/add-task", {
        email: user.email,
        task,
        target,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      successToast("Task Added!");
      await fetchTasks();
    } catch (error) {
      console.error("Add task error:", error);
      errorToast("Could not add task");
    }
  };


  const markCompleted = async (taskId) => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/mark-complete", {
        email: user.email,
        taskId,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      successToast("Task Completed!");
      await fetchTasks();
    } catch (error) {
      console.error("Complete task error:", error);
      errorToast("Could not complete task");
    }
  };

 
  const deleteTask = async (taskId) => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/delete-task", {
        email: user.email,
        taskId,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      successToast("Task Deleted!");
      await fetchTasks();
    } catch (error) {
      console.error("Delete task error:", error);
      errorToast("Could not delete task");
    }
  };


  const deleteAllTasks = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/delete-all-task", {
        email: user.email,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      successToast("All Tasks Deleted!");
      await fetchTasks();
    } catch (error) {
      console.error("Delete all tasks error:", error);
      errorToast("Unable to delete all tasks");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        completedTasks,
        incompleteTasks,
        strikeCount,
        loading,

        // Functions
        fetchTasks,
        addTask,
        deleteTask,
        deleteAllTasks,
        markCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
