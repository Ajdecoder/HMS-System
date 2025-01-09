import React, { useEffect, useState } from "react";
import Home from "../Home";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export const VerifyAuth = () => {
  const [authenticated, seAuthenticated] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Hfmtoken");
    if (token) {
      seAuthenticated(true);
    } else {
      seAuthenticated(false);
    }
  }, [authenticated]);

  return <div>{authenticated ? navigate('/'): <Login />}</div>;
};
