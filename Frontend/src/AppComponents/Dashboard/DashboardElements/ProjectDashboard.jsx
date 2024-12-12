import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardCard from "./ProjectDashboardComponents/DashboardCard";
import callAPI from "@/http/axios";
import Loader from "@/utils/Loader";
import { Button } from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import { FcGenealogy } from "react-icons/fc";
import AddEditTaskDialog from "../DashboardElements/ProjectBoardComponents/AddEditTaskDialog";
import AddProjectForm from "./ProjectDashboardComponents/AddProjectForm";

const ProjectDashboard = () => {
  const [loading, setLoading] = useState(null);
  const [projects, setProjects] = useState([]);
  const { productId } = useParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };
  
  useEffect(() => {
    const getProjectsByProduct = async () => {
      setLoading(true);
      try {
        const response = await callAPI(
          "GET",
          `/projects/product/${productId}/projects`,
          null,
          {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        );
        setProjects(response?.projects);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjectsByProduct();
  }, [productId]);
  return loading ? (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>
  ) : (
    <div className="m-4 px-8 w-full">
      <div className=" flex justify-between items-center ">
        <div>
          <h1 className="text-4xl font-bold">Your Projects</h1>
          <p className="text-base  font-normal">
            These are the projects which exist in your Product
          </p>
        </div>
        <div>
          <Button
            className="px-4 py-2"
            variant="default"
            size
            onClick={handleDialogOpen}
          >
            <span className="mr-1">
              <FaPlus size={24} />
            </span>{" "}
            <span className="mr-1">Add Project</span>
          </Button>
        </div>
      </div>
      <div>
        <AddEditTaskDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          Title="Add Project"
          icon={<FcGenealogy size={24} />}
        >
          <AddProjectForm />
        </AddEditTaskDialog>
      </div>
      <div>
        <DashboardCard projects={projects} />
      </div>
    </div>
    
  );
};

export default ProjectDashboard;
