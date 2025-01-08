import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const { loggedInUser, logout } = useAuth(); // Extract user and logout from context
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center relative">
      <h2
        onClick={() => navigate("/")}
        className="text-white text-2xl font-bold animate-pulse cursor-pointer"
      >
        HFM
      </h2>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/patients"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Patients
          </Link>
        </li>
        <li>
          <Link
            to="/diet-charts"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Diet Charts
          </Link>
        </li>
      </ul>
      <div className="relative">
        <button
          onClick={toggleProfileModal}
          className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300"
        >
          {loggedInUser ? (
            <button className="text-white font-bold">
              {loggedInUser?.name}
            </button>
          ) : (
            <button onClick={navigate('/auth/login')} >Login</button>
          )}

         {loggedInUser && <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>}
        </button>
        {isProfileModalOpen && loggedInUser && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
            <div className="px-4 py-2 text-gray-600">
              Email : {loggedInUser?.email}
            </div>
            <hr className="border-t-1 border-gray-200" />
            <div className="px-4 py-2 text-gray-600">
              DepartMent : {loggedInUser?.role}
            </div>
            <hr className="border-t-1 border-gray-200" />
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                  setProfileModalOpen(false);
                }}
              >
                Dashboard
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                  setProfileModalOpen(false);
                }}
              >
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
