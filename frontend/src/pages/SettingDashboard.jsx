import React, { useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
const SettingDashboard = () => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <section className="my-8 mx-auto max-w-7xl min-h-80 md:w-1/2 bg-white md:shadow-xl md:rounded-2xl md:border-[0.3px] border-black">
      <h2 className="md:text-xl text-lg border-b-2 border-black text-center py-2 font-semibold">
        General Setting
      </h2>
      <ul>
        <li
          className=" w-full cursor-pointer md:p-4 p-2  md:text-xl text-sm flex justify-between"
          onClick={() => setToggle(!toggle)}
        >
          <p>Reminder</p>{" "}
          <div
            className={` rounded-full transition ${
              toggle ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {toggle ? (
              <ToggleRight size={24} color="green" />
            ) : (
              <ToggleLeft size={24} color="red" />
            )}
          </div>
        </li>
        <div className="flex justify-center">
          <div className="h-[0.5px] w-full bg-gray-600"></div>
        </div>
        <li className="w-full md:p-4 p-2  md:text-xl text-sm flex justify-between">
          <p>Reminder In</p>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border  rounded text-lg"
          >
            <option value="">Select option</option>
            <option value="1D">1 Day</option>
            <option value="2D">2 Day</option>
            <option value="3D" disabled>
              3 Day
            </option>
            <option value="1W" disabled>
              1 Week
            </option>
            <option value="2D" disabled>
              2 Days
            </option>
          </select>
        </li>
        <div className="flex justify-center">
          <div className="h-[0.5px] w-full bg-gray-600"></div>
        </div>
      </ul>
    </section>
  );
};

export default SettingDashboard;
