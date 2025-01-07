import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FcParallelTasks } from "react-icons/fc";
import CardBoard from "./ProjectBoardComponents/CardBoard";
import { Button } from "@/components/ui/Button";
import { FiSearch } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import AppContext from "../../../context/AppContext";
import SideDrawer from "./ProjectBoardComponents/SideDrawer";
import callAPI from "@/http/axios";
import Loader from "../../../utils/Loader";
import { Badge } from "../../../components/ui/badge";
import BreadCrumb from "./ProjectBoardComponents/BreadCrumb";
import Topbar from "../Topbar";

const ProjectBoard = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleDrawer,
    fetchCurrentProjectBoard,
  } = useContext(AppContext);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(null);
  const [project, setProject] = useState([]);
  const { currentUserDetails } = useContext(AppContext);

  const getProjectsByProduct = async () => {
    setLoading(true);
    const response = await callAPI("GET", `/projects/${projectId}`, null, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    setProject(response?.project);
    console.log("response", response);
  };

  useEffect(() => {
    try {
      getProjectsByProduct();
      fetchCurrentProjectBoard(projectId);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  

  return loading ? (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>
  ) : (
    <div className=" w-full ">
      <Topbar
        orgName={currentUserDetails?.organization?.organizationName}
        orgLogo={currentUserDetails?.organization?.orgLogo}
      />
      <div
        className="p-3 pt-2 w-full "
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
          <div>
            <div className="inline-flex rounded-full p-2 pr-4 pl-4 gap-2 items-center backdrop-blur-sm bg-white/50 shadow-lg">
              <div className="bg-transparent">
                <FcParallelTasks size={26} />
              </div>
              {loading ? (
                <Loader width={50} height={50} />
              ) : (
                <div className="bg-transparent">
                  <h1 className="text-xl font-bold"> {project?.projectName}</h1>
                </div>
              )}
            </div>
            <div className="mt-4 ml-2">
              <BreadCrumb
                currentProject={project?.projectName}
                currentProduct={project?.product?.productName}
              />
            </div>
          </div>

          <div>
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
        </div>
        <CardBoard />
      </div>
    </div>
  );
};

export default ProjectBoard;
