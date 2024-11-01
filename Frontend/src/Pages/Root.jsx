import React from "react";
import Navbar from "../AppComponents/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  console.log("location", location);

  const hideNavbarRoutes = [
    "/dashboard",
    "/dashboard/create_project",
    "/dashboard/project/:projectId",
  ];
  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/project/");
  console.log("shouldHideNavbar", shouldHideNavbar);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Root;
