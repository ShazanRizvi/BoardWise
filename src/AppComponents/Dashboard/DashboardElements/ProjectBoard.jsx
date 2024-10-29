import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { FcParallelTasks } from "react-icons/fc";
import CardBoard from "./ProjectBoardComponents/CardBoard";
import { Button } from "@/components/ui/Button";
import { FiSearch } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import AppContext from "../../../context/AppContext";
import SideDrawer from "./ProjectBoardComponents/SideDrawer";

const ProjectBoard = () => {
  const { isDrawerOpen, setIsDrawerOpen, handleDrawer } = useContext(AppContext);
  const { projectId } = useParams();
  return (
    <div
      className="p-5 w-full "
      style={{
        backgroundImage:
          "radial-gradient(circle, #d3d3d3 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        width: "100%",
        height: "100vh", // Full-screen height
        backgroundColor: "white", // Set background color
      }}
    >
      <div className="flex justify-between">
        <div className="inline-flex rounded-full p-2 pr-4 pl-4 gap-2 items-center backdrop-blur-sm bg-white/50 shadow-lg">
          <div className="bg-transparent">
            <FcParallelTasks size={26} />
          </div>
          <div className="bg-transparent">
            <h1 className="text-2xl font-bold">New Project: {projectId}</h1>
          </div>
        </div>

        <div className="flex gap-2">
        <div className="inline-flex rounded-full items-center backdrop-blur-sm bg-white/50 shadow-lg">
          <button className="bg-transparent text-black p-3 ">
            <a href="/projectboard">
              <FiSearch size={20} />
            </a>
          </button>
        </div>
        <div className="inline-flex rounded-full items-center backdrop-blur-sm bg-white/50 shadow-lg">
          <button className="bg-transparent text-black p-3 ">
            <a href="/projectboard">
              <FaRegStar size={20} />
            </a>
          </button>
        </div>
        <div className="inline-flex rounded-full items-center backdrop-blur-sm bg-white/50 shadow-lg">
          <button className="bg-transparent text-black p-3 ">
            <a href="/projectboard">
              <HiDotsVertical size={20} />
            </a>
          </button>
        </div>
        </div>
      </div>
      <CardBoard />
      

    </div>
  );
};

export default ProjectBoard;
