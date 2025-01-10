import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext";
import Navbar from "./components/Navbar";
import Patients from "./components/Patients";
import Login from "./components/Auth/Login";
import DietCharts from "./components/DietCharts";
import Signup from "./components/Auth/Register";
import { Dashboard } from "./components/DashBoard";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";
import TrackDeliveries from './components/TrackDeliveries'
import {MealDeliveries} from './components/MealDelivery'

const App = () => {
  const { loggedInUser } = useAuth(); 
  
  console.log(loggedInUser)

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={loggedInUser ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={loggedInUser ? <Dashboard /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/patients"
          element={loggedInUser ? <Patients /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/auth/login"
          element={loggedInUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/auth/signup"
          element={loggedInUser ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/diet-charts"
          element={loggedInUser ? <DietCharts /> : <Navigate to="/auth/login" />}
        />  
        <Route
          path="/meal-deliveries"
          element={loggedInUser ? <MealDeliveries /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/track-deliveries"
          element={loggedInUser ? <TrackDeliveries /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
