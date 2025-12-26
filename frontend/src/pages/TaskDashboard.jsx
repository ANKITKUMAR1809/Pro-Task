import React from "react";
import { useTask } from "../context/TaskContext";

const TaskDashboard = () => {
  const { completedTasks, incompleteTasks } = useTask();

  const totalTasks =
    (completedTasks?.length || 0) + (incompleteTasks?.length || 0);

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col ">
      {/* ===== HEADER / STATS ===== */}
      {/* <div className="bg-white shadow p-4 sticky top-0 -z-1">
        <h2 className="text-lg font-semibold text-center">
          Task Dashboard
        </h2>

        <div className="grid grid-cols-3 gap-3 mt-3 text-center">
          <StatCard title="Total" value={totalTasks} />
          <StatCard
            title="Completed"
            value={completedTasks.length}
            color="text-green-600"
          />
          <StatCard
            title="Pending"
            value={incompleteTasks.length}
            color="text-red-600"
          />
        </div>


        <div className="mt-3">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {progress}% completed
          </p>
        </div>
      </div> */}

      {/* ===== TASK AREA ===== */}
      <div className="flex-1 p-3">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 h-full">
          {/* 🔴 Incomplete Tasks */}
          <TaskCard
            title="Incomplete Tasks"
            color="red"
            tasks={incompleteTasks}
            showTarget
          />

          {/* 🟢 Completed Tasks */}
          <TaskCard
            title="Completed Tasks"
            color="green"
            tasks={completedTasks}
          />
        </div>
      </div>
    </section>
  );
};

/* ===== TASK CARD ===== */
const TaskCard = ({ title, color, tasks, showTarget = false }) => {
  const colorMap = {
    red: {
      title: "text-red-600",
      border: "border-red-300",
      bg: "bg-red-50",
      badge: "bg-red-200 text-red-800",
      text: "text-red-800",
    },
    green: {
      title: "text-green-600",
      border: "border-green-300",
      bg: "bg-green-50",
      text: "text-green-800",
    },
  };

  const c = colorMap[color];

  return (
    <div className="bg-white rounded-xl shadow flex flex-col h-[calc(100vh-230px)] md:h-[calc(100vh-200px)]">
      <h3
        className={`p-4 border-b font-semibold ${c.title}`}
      >
        {title}
      </h3>

      {/* SCROLLABLE LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`border ${c.border} ${c.bg} rounded-lg p-3`}
            >
              <p className={`font-medium ${c.text}`}>
                {task.title}
              </p>

              {showTarget && task.target && (
                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${c.badge}`}
                >
                  {task.target}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No tasks here
          </p>
        )}
      </div>
    </div>
  );
};

/* ===== STAT CARD ===== */
const StatCard = ({ title, value, color = "text-gray-800" }) => (
  <div className="border rounded-lg p-2">
    <p className="text-xs text-gray-500">{title}</p>
    <p className={`text-base font-semibold ${color}`}>
      {value}
    </p>
  </div>
);

export default TaskDashboard;
