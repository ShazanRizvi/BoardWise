import React from "react";
import Navbar from "../AppComponents/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  console.log("location", location);

  const hideNavbarRoutes = [
    "/dashboard",
    "/dashboard/create_project",
    "/dashboard/project/:projectId",
    "/dashboard/product_dashboard",
    "/dashboard/project_dashboard/:productId",
    "/dashboard/organization/people_of_org",
    "/activate-account"
  ];
  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/project/") ||
    location.pathname.startsWith("/dashboard/project_dashboard/");
  console.log("shouldHideNavbar", shouldHideNavbar);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div><Toaster/></div>
      <Outlet />
    </>
  );
};

export default Root;
