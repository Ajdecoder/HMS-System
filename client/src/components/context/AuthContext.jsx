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
      setLoading(false); // Set loading to false once the check is complete
    };

    checkToken();
  }, []);

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("Hfmtoken");
  };

  if (loading) {
    // Optionally, you can render a loading spinner or a loading message here
    return <div>Loading...</div>;
  }

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
