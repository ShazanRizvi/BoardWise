import React from "react";
import Navbar from "./AppComponents/Navbar";
import Hero from "./AppComponents/Hero";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";
function App() {
  return (
    <>
      <Navbar />
      <Hero/>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
