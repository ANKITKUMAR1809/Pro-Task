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
  const [loading, setLoading] = useState(false);

  /* ================= FETCH TASKS (ONLY ON LOGIN) ================= */
  const fetchTasks = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://pro-task-production.up.railway.app/api/user/get-all-tasks",
        { email: user.email }
      );

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      setCompletedTasks(res.data.completedTasks || []);
      setIncompleteTasks(res.data.pendingTasks || []);

    } catch (error) {
      console.error("Fetch tasks error:", error);
      errorToast("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RUN ON LOGIN ================= */
  useEffect(() => {
    if (user?.email) {
      fetchTasks();
    }
  }, [user]);

  /* ================= ADD TASK ================= */
  const addTask = async (task, target) => {
    if (!task || !target) {
      infoToast("Task and Target are required!");
      return;
    }

    try {
      const res = await axios.post(
        "https://pro-task-production.up.railway.app/api/user/add-task",
        {
          email: user.email,
          task,
          target,
        }
      );

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      // 🔥 INSTANT UI UPDATE
      setIncompleteTasks(prev => [
        res.data.task, // backend must return created task
        ...prev,
      ]);

      successToast("Task Added!");

    } catch (error) {
      console.error("Add task error:", error);
      errorToast("Could not add task");
    }
  };

  /* ================= MARK COMPLETED ================= */
  const markCompleted = async (taskId) => {
    try {
      const res = await axios.post(
        "https://pro-task-production.up.railway.app/api/user/mark-complete",
        {
          email: user.email,
          taskId,
        }
      );

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      // Remove from pending
      setIncompleteTasks(prev =>
        prev.filter(task => task._id !== taskId)
      );

      // Add to completed
      setCompletedTasks(prev => [
        res.data.task, // backend returns updated task
        ...prev,
      ]);

      successToast("Task Completed!");

    } catch (error) {
      console.error("Complete task error:", error);
      errorToast("Could not complete task");
    }
  };

  /* ================= DELETE TASK ================= */
  const deleteTask = async (taskId) => {
    try {
      const res = await axios.post(
        "https://pro-task-production.up.railway.app/api/user/delete-task",
        {
          email: user.email,
          taskId,
        }
      );

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      // Remove from pending instantly
      setIncompleteTasks(prev =>
        prev.filter(task => task._id !== taskId)
      );

      successToast("Task Deleted!");

    } catch (error) {
      console.error("Delete task error:", error);
      errorToast("Could not delete task");
    }
  };

  /* ================= DELETE ALL TASKS ================= */
  const deleteAllTasks = async () => {
    try {
      const res = await axios.post(
        "https://pro-task-production.up.railway.app/api/user/delete-all-task",
        { email: user.email }
      );

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      setCompletedTasks([]);
      setIncompleteTasks([]);

      successToast("All Tasks Deleted!");

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
        loading,

        // functions
        fetchTasks,
        addTask,
        markCompleted,
        deleteTask,
        deleteAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
