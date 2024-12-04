import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import OnboardingForm from "../AppComponents/Onboarding/OnboardingForm";
import Dashboard from "../Pages/Dashboard";
import CreateProject from "../AppComponents/Dashboard/DashboardElements/CreateProject";
import ProjectBoard from "../AppComponents/Dashboard/DashboardElements/ProjectBoard";
import SignUp from "../AppComponents/Onboarding/Forms/SignUp";
import CreateOrganization from "../AppComponents/Onboarding/Forms/CreateOrganization";
import CreateProduct from "../AppComponents/Onboarding/Forms/CreateProduct";
import SignUpCreateProject from "../AppComponents/Onboarding/Forms/SignUpCreateProject";
import ProductDashboard from "../AppComponents/Dashboard/DashboardElements/ProductDashboard";
import ProjectDashboard from "../AppComponents/Dashboard/DashboardElements/ProjectDashboard";
import PeopleInOrg from "../AppComponents/Dashboard/PeopleInOrg";
import Login from "../AppComponents/Login";
import ProtectedRoutes from "./ProtectedRoutes";

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
      path: "login",
      element: <Login/>
    },
    {
     path: "onboarding",
     children:[
        {
          index:true,
          element:<Navigate to="personal-info" replace />
        },
        {
          path: "personal-info", // First step of onboarding
          element: <OnboardingForm><SignUp /></OnboardingForm>,
        },
        {
          path: "create-organization", // First step of onboarding
          element: <OnboardingForm><CreateOrganization /></OnboardingForm>,
        },
        {
          path: "create-product", // First step of onboarding
          element: <OnboardingForm><CreateProduct /></OnboardingForm>,
        },
        {
          path: "create-project", // First step of onboarding
          element: <OnboardingForm><SignUpCreateProject /></OnboardingForm>,
        },

     ]
   },
   {
    path: "dashboard",
    element:<Dashboard/>,
    children: [
      {
        index: true, // This will load the default dashboard content
        element: <Navigate to="/dashboard/product_dashboard" replace />,
      },
      {
        path: "/dashboard/product_dashboard",
        element:<ProtectedRoutes><ProductDashboard/></ProtectedRoutes>

      },
      {
        path: "/dashboard/project_dashboard/:productId",
        element:<ProtectedRoutes><ProjectDashboard/></ProtectedRoutes>

      },
      {
        path: "/dashboard/create_project",
        element:<ProtectedRoutes><CreateProject/></ProtectedRoutes>
      },
      {
        path:'project/:projectId',
        element:<ProtectedRoutes><ProjectBoard/></ProtectedRoutes>
      },
      {
        path:'organization/people_of_org',
        element:<ProtectedRoutes><PeopleInOrg/></ProtectedRoutes>
      }
    ],
  },
  ],
}]);

export default appRouter;
