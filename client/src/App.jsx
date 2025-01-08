import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Patients from './components/Patients';
import Login from './components/Auth/Login';
import DietCharts from './components/DietCharts';
import Signup from './components/Auth/Register';
import { VerifyAuth } from './components/Auth/VerifyAuth';
import { AuthProvider } from './components/context/AuthContext';
import { Dashboard } from './components/DashBoard.jsx';


const App = () => {
  return (
  <AuthProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VerifyAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/diet-charts" element={<DietCharts />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
