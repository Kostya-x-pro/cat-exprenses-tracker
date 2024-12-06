import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuth();
  
  if (user === undefined) {
    return <p>Загрузка...</p>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
