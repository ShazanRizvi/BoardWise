import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Pages/Root";
import Home from "../Pages/Home";

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
  ],
}]);

export default appRouter;
