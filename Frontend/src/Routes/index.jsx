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
        element:<ProductDashboard/>

      },
      {
        path: "/dashboard/project_dashboard/:productId",
        element:<ProjectDashboard/>

      },
      {
        path: "/dashboard/create_project",
        element:<CreateProject/>
      },
      {
        path:'project/:projectId',
        element:<ProjectBoard/>
      },
      {
        path:'organization/people_of_org',
        element:<PeopleInOrg/>
      }
    ],
  },
  ],
}]);

export default appRouter;
