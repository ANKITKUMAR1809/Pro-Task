import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import AiChat from "../components/AiChat";
import AddTask from "../components/AddTask";
import Pomedoro from "../components/Pomedoro";
import StackTask from "../components/StackTask";

import {
  Plus,
  X,
  FilePlus,
  ListChecks,
  Timer,
} from "lucide-react";

const HomeDashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen  z-10">
      {/* ================= GRID FOR LAPTOP ================= */}
      <div className="hidden lg:grid grid-cols-12 gap-4 p-4 min-h-screen max-w-7xl mx-auto">
        <div className="col-span-5">
          <AiChat />
        </div>

        <div className="col-span-3 flex flex-col gap-4 min-h-screen">
          <AddTask />
          <StackTask />
        </div>

        <div className="col-span-4 ">
          <Pomedoro />
        </div>
      </div>

      {/* ================= BELOW LAPTOP ================= */}
      <div className="lg:hidden w-full min-h-screen">
        <AiChat />
      </div>

      {/* ================= FLOATING DRAGGABLE BUTTON ================= */}
      <motion.div
        drag
        dragMomentum={false}
        className="lg:hidden fixed bottom-6 right-6 z-50"
      >
        {/* OPTIONS */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3 items-end"
            >
              <ActionButton
                icon={<FilePlus size={18} />}
                label="Add Task"
                onClick={() => navigate("/dashboard/addtask")}
              />

              <ActionButton
                icon={<ListChecks size={18} />}
                label="See Task"
                onClick={() => navigate("/dashboard/see-task")}
              />

              <ActionButton
                icon={<Timer size={18} />}
                label="Pomodoro"
                onClick={() => navigate("/dashboard/pomedaro")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PLUS / CROSS BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="bg-black text-white p-4 rounded-full shadow-xl"
        >
          <motion.div
            initial={false}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={28} /> : <Plus size={28} />}
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HomeDashboard;

/* ================= SMALL COMPONENT ================= */
const ActionButton = ({ icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);
