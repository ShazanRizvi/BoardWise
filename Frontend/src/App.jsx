import React from "react";

import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
