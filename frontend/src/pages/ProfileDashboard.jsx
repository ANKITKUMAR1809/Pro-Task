import React from "react";
import {CircleStar} from "lucide-react"
const ProfileDashboard = () => {
  return (
    <section className="my-8 mx-auto max-w-7xl min-h-80 md:w-1/2 bg-white md:shadow-xl md:rounded-2xl md:border-[0.3px] border-black">
      <h2 className="md:text-xl text-lg border-b-2 border-black text-center py-2 font-semibold">
        Profile Setting
      </h2>
      <ul>
        <li className=" w-full cursor-pointer md:p-4 p-2  md:text-xl text-sm flex justify-between">
          <p>Membership</p> <p className="flex gap-2 border-2 border-black p-1 text-md rounded-xl active:translate-0.5 items-center">Upgrade <CircleStar size={26}/></p>
        
        </li>
        <div className="flex justify-center">
          <div className="h-[0.5px] w-full bg-gray-600"></div>
        </div>
        
       
      </ul>
    </section>
  );
};

export default ProfileDashboard;
