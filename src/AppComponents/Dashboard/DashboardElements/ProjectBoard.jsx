import React from "react";
import { useParams } from "react-router-dom";
import { FcParallelTasks } from "react-icons/fc";
import CardBoard from "./ProjectBoardComponents/CardBoard";

const ProjectBoard = () => {
  const { projectId } = useParams();
  return (
    <div className="p-5 w-full">
      <div className="flex items-center">
        <div>
          <FcParallelTasks size={30} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{projectId}</h1>
        </div>
      </div>
      <CardBoard />

    </div>
  );
};

export default ProjectBoard;
