import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { errorToast, successToast, infoToast } from "../utils/toast";

const AddTask = () => {
  const completedIn = ["1D", "2D", "3D", "1W", "2W"];
  const [task, setTask] = useState("");
  const [target, setTarget] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!task || !target) {
      infoToast("Please enter a task and choose a target!");
      return;
    }

    try {
      const email = user.email;
      const res = await axios.post("http://localhost:3000/api/user/add-task", {
        email,
        task,
        target,
      });

      if (!res.data.success) {
        infoToast(res.data.message);
        return;
      }

      setTask("");
      setTarget(null);
      successToast(res.data.message);
    } catch (error) {
      errorToast("Something Went Wrong. Please Try Again.");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Task
        </h2>

        {/* Task Input */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Task Title
          </label>
          <input
            type="text"
            placeholder="Enter your task..."
            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        {/* Target Selector */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Target Duration
          </label>

          <select
            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-white cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={target || ""}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="" disabled>
              Select duration
            </option>
            {completedIn.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!task || !target}
          className={`w-full py-3 mt-2 rounded-xl text-white font-medium transition-all 
            ${
              task && target
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
