import React, { createContext, useContext, useState, useEffect } from "react";
import { Decodejwt } from "../utils/Jwtdecode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle user from JWT token
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("Hfmtoken");
      if (token) {
        try {
          const decodedUser = Decodejwt(token);
          setLoggedInUser(decodedUser);
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("Hfmtoken"); // Remove invalid token
        }
      }
      setLoading(false);
    };
  
    checkToken();
  }, []);
  

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("Hfmtoken");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
