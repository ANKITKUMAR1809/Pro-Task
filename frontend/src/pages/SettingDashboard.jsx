import React, { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SettingDashboard = () => {
  const {
    reminder,
    setReminder,
    reminderIn,
    setReminderIn,
  } = useAuth();

  const [value, setValue] = useState(reminderIn || "");

  // Update reminderIn ONLY when value is valid
  useEffect(() => {
    if (value) {
      setReminderIn(value);
    }
  }, [value, setReminderIn]);

  return (
    <section className="my-8 mx-auto max-w-7xl min-h-80 md:w-1/2 bg-white md:shadow-xl md:rounded-2xl md:border border-black">
      
      <h2 className="md:text-xl text-lg border-b-2 border-black text-center py-2 font-semibold">
        General Setting
      </h2>

      <ul>
        {/* Reminder Toggle */}
        <li
          className="w-full cursor-pointer md:p-4 p-2 md:text-xl text-sm flex justify-between items-center"
          onClick={() => setReminder(!reminder)}
        >
          <p>Reminder</p>

          <div
            className={`rounded-full transition ${
              reminder ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {reminder ? (
              <ToggleRight size={26} color="green" />
            ) : (
              <ToggleLeft size={26} color="red" />
            )}
          </div>
        </li>

        <div className="h-[0.5px] w-full bg-gray-600" />

        {/* Reminder Interval */}
        <li className="w-full md:p-4 p-2 md:text-xl text-sm flex justify-between items-center">
          <p>Reminder In</p>

          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!reminder}
            className={`border rounded px-2 py-1 text-lg ${
              !reminder ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select option</option>
            <option value="2H">2 Hour</option>
            <option value="4H">4 Hour</option>
            <option value="6H" disabled>
              6 Hour
            </option>
          </select>
        </li>

        <div className="h-[0.5px] w-full bg-gray-600" />
      </ul>
    </section>
  );
};

export default SettingDashboard;
