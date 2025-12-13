import React, { useEffect, useState } from "react";
import { CircleX, CircleCheckBig, ClockFading } from "lucide-react";
import { useTask } from "../context/TaskContext";

const StackTask = () => {
  const [task, setTask] = useState([]);
  const { incompleteTasks, loading, markCompleted, deleteTask } = useTask();

  useEffect(() => {
    if (!loading) {
      setTask(incompleteTasks);
    }
  }, [incompleteTasks, loading]);

  return (
    <section className="max-h-screen md:h-1/2 bg-white p-4 shadow-xl m-2 rounded-xl">
      <h3 className="text-center font-semibold text-2xl mb-3">
        Incomplete Tasks
      </h3>

      <div className="overflow-y-scroll max-h-[70vh] space-y-3">

        {/* Header */}
       

        {/* Task List */}
        {task.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No pending tasks 🎉</p>
        ) : (
          task.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center bg-zinc-50 py-3 px-4 rounded-xl border shadow hover:shadow-md transition-all"
            >
              {/* Task Details */}
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {t.title}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(t.createdAt).toLocaleDateString()}
                </p>

                <span className="text-xs mt-1 inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                  Target: {t.target}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">

                {/* Mark Completed */}
                <button
                  onClick={() => markCompleted(t._id)}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition"
                >
                  <CircleCheckBig className="text-green-600" size={22} />
                </button>

                {/* Delete Task */}
                <button
                  onClick={() => deleteTask(t._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
                >
                  <CircleX className="text-red-600" size={22} />
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default StackTask;
