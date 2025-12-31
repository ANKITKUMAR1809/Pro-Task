import React from "react";
import { CircleX, CircleCheckBig } from "lucide-react";
import { useTask } from "../context/TaskContext";

const StackTask = () => {
  const { incompleteTasks, loading, markCompleted, deleteTask } = useTask();

  return (
    <section className=" bg-white p-4 shadow-xl m-2 rounded-xl flex flex-col">
      {/* Header */}
      <h3 className="text-center font-semibold text-2xl mb-3 shrink-0">
        Incomplete Tasks
      </h3>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 lg:max-h-70 max-h-full">
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : incompleteTasks.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            No pending tasks 🎉
          </p>
        ) : (
          incompleteTasks.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center bg-zinc-50 py-3 px-4 rounded-xl border shadow"
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

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => markCompleted(t._id)}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-full"
                >
                  <CircleCheckBig className="text-green-600" size={22} />
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
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
