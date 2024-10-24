import React from "react";
import { useParams } from "react-router-dom";
import { FcParallelTasks } from "react-icons/fc";
import CardBoard from "./ProjectBoardComponents/CardBoard";

const ProjectBoard = () => {
  const { projectId } = useParams();
  return (
    <div
      className="p-5 w-full bg-white "
      style={{
        backgroundImage: "radial-gradient(circle, #d3d3d3 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        width: "100%",
        height: "100vh", // Full-screen height
        backgroundColor: "white", // Set background color
      }}
    >
      <div className="inline-flex rounded-full p-2 pr-4 pl-4 gap-2 items-center bg-white drop-shadow-xl">
        <div>
          <FcParallelTasks size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">New Project: {projectId}</h1>
        </div>
      </div>
      <CardBoard />
    </div>
  );
};

export default ProjectBoard;
