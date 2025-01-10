import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { motion } from "framer-motion"; // Importing Framer Motion

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
    <nav className="bg-black p-4 flex justify-between items-center relative">
      <h2
        onClick={() => navigate("/")}
        className="text-white text-2xl font-bold animate-pulse cursor-pointer"
      >
        HFM
      </h2>
      <ul className="flex space-x-6">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="text-white hover:text-blue-300 transition duration-300"
        >
          <Link to="/" className="transition duration-300">
            Home
          </Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="text-white hover:text-blue-300 transition duration-300"
        >
          <Link to="/patients" className="transition duration-300">
            Patients
          </Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="text-white hover:text-blue-300 transition duration-300"
        >
          <Link to="/diet-charts" className="transition duration-300">
            Diet Charts
          </Link>
        </motion.li>

        {/* Conditional rendering based on role */}
        {loggedInUser?.role === "food_manager" && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-blue-300 transition duration-300"
          >
            <Link to="/reports" className="transition duration-300">
              Reports
            </Link>
          </motion.li>
        )}
        {loggedInUser?.role === "pantry_staff" && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-blue-300 transition duration-300"
          >
            <Link to="/meal-deliveries" className="transition duration-300">
              Meal Deliveries
            </Link>
          </motion.li>
        )}
        {loggedInUser?.role !== "pantry_staff" && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-blue-300 transition duration-300"
          >
            <Link to="/track-deliveries" className="transition duration-300">
              Track Deliveries
            </Link>
          </motion.li>
        )}
      </ul>

      <div className="relative">
        <motion.button
          onClick={toggleProfileModal}
          className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300 p-2"
          whileHover={{ scale: 1.1 }}
        >
          {loggedInUser ? (
            <button className="text-white font-bold">{loggedInUser?.name}</button>
          ) : (
            <button onClick={() => navigate("/auth/login")}>Login</button>
          )}

          {loggedInUser && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ rotate: 180 }} // Animation for the arrow
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          )}
        </motion.button>

        {isProfileModalOpen && loggedInUser && (
          <motion.div
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-[18rem] p-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 text-gray-600">
              Email : {loggedInUser?.email}
            </div>
            <hr className="border-t-1 border-gray-200" />
            <div className="px-4 py-2 text-gray-600">
              Department : {loggedInUser?.role}
            </div>
            <hr className="border-t-1 border-gray-200" />
            <ul className="p-4">
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                  toggleProfileModal();
                }}
              >
                Dashboard
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                  toggleProfileModal();
                }}
              >
                Settings
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
