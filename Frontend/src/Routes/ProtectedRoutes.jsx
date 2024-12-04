import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../utils/Loader";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const validateToken = async () => {
      setIsLoading(true);
      try {
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  if (isLoading) {
    // Show loading animation while token is being checked
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    
    return (
     <>
     <Navigate to="/home" state={{ from: location }} replace />;
     <Loader />
     </>
    
    
)
    

  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoutes;
