import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import FoodManagerDashboard from "./Dashboards/FoodManagerDashboard";
import PantryStaffDashboard from "./Dashboards/InnerPantry";

export const Dashboard = () => {
  const { loggedInUser } = useAuth();

  const userRole = loggedInUser?.role;

  switch (userRole) {
    case "food_manager":
      return <FoodManagerDashboard />;  
    case "pantry_staff":
      return <PantryStaffDashboard />;
    
    default:
      return <h1>Unauthorized Access</h1>;
  }
};
