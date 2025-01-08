import React, { useEffect, useState } from "react";
import Home from "../Home";
import Login from "./Login";

export const VerifyAuth = () => {

  const [authenticated, seAuthenticated] = useState();

  useEffect(() => {
    const token = localStorage.getItem("Hfmtoken");
    if (token) {
      seAuthenticated(true);
    } else {
      seAuthenticated(false);
    }
  },[authenticated]);

  return <div>{authenticated ? <Home /> : <Login />}</div>;
};
