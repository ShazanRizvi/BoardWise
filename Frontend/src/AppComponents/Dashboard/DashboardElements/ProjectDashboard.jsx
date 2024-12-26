import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardCard from "./ProjectDashboardComponents/DashboardCard";
import callAPI from "@/http/axios";
import Loader from "@/utils/Loader";
import { Button } from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import { FcGenealogy } from "react-icons/fc";
import AddEditTaskDialog from "../DashboardElements/ProjectBoardComponents/AddEditTaskDialog";
import AddProjectForm from "./ProjectDashboardComponents/AddProjectForm";
import AppContext from "../../../context/AppContext";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Badge } from "@/components/ui/badge";
import Topbar from "../Topbar";
import EmptyDashboard from "../../DataTable/EmptyDashboard";

const ProjectDashboard = () => {
  const [loading, setLoading] = useState(null);
  const [projects, setProjects] = useState([]);
  const { productId } = useParams();
  const { usersOfOrg, currentUserDetails } = useContext(AppContext);

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
    <div className="w-full ">
      <Topbar
        orgName={currentUserDetails?.organization?.organizationName}
        orgLogo={currentUserDetails?.organization?.orgLogo}
      />
      {projects.length === 0 ? (
        <div className="flex-col flex items-center justify-center mt-4">
          <EmptyDashboard Resource="Projects" />
          <div className="mt-5">
                <Button
                  className="px-4 py-2"
                  variant="outline"
                  size
                  onClick={handleDialogOpen}
                >
                  <span className="mr-1">
                    <FaPlus size={24} />
                  </span>{" "}
                  <span className="mr-1">Add Project</span>
                </Button>
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
        </div>
      ) : (
        <div className="mt-2 px-8 w-full">
          <div className=" flex justify-between items-center ">
            <div>
              <div className="mb-1">
                <Badge variant="dashboard" className="text-xs">
                  {" "}
                  {projects[0]?.product?.productName}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold">Your Projects</h1>
              <div className="flex items-center justify-between mt-2 ">
                <AnimatedTooltip items={usersOfOrg} />
              </div>
            </div>
            <div className="flex-col justify-between items-center">
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
      )}
    </div>
  );
};

export default ProjectDashboard;
