import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import OnboardingForm from "../AppComponents/Onboarding/OnboardingForm";
import Dashboard from "../Pages/Dashboard";
import CreateProject from "../AppComponents/Dashboard/DashboardElements/CreateProject";
import ProjectBoard from "../AppComponents/Dashboard/DashboardElements/ProjectBoard";
import SignUp from "../AppComponents/Onboarding/SignUp/SignUp";

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [
    {
      index: true, // This indicates it matches the exact path '/'
      element: <Navigate to="/home" replace />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
     path: ":mode",
     element:<OnboardingForm cardTitle="Sign Up" cardDescription="Sign Up to get started"><SignUp/></OnboardingForm>,
   },
   {
    path: "dashboard",
    element:<Dashboard/>,
    children: [
      {
        index: true, // This will load the default dashboard content
        element: <Navigate to="/dashboard/create_project" replace />,
      },
      {
        path: "/dashboard/create_project",
        element:<CreateProject/>
      },
      {
        path:'project/:projectId',
        element:<ProjectBoard/>
      }
    ],
  },
  ],
}]);

export default appRouter;
