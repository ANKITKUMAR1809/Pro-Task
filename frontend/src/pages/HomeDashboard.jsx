import React from "react";
import AiChat from "../components/AiChat";
import AddTask from "../components/AddTask";
import Pomedoro from "../components/Pomedoro";
import StackTask from "../components/StackTask";

const HomeDashboard = () => {
  return (
    <section className="flex flex-row min-h-screen p-8 justify-around flex-wrap ">
      <div className="">
        <AiChat />
      </div>
      <div className="flex flex-col  justify-around">
        <AddTask />
        <StackTask/>
      </div>
      <div>
        <Pomedoro />
      </div>
    </section>
  );
};

export default HomeDashboard;
