import React, { useState, useEffect } from "react";
import { fetchPatients } from "../services/api";
import { useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";  // Import framer-motion

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await fetchPatients();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    // Fetch patients only if logged in user exists
    if (loggedInUser) {
      getPatients();
    }
  }, [loggedInUser]);

  return (
    <div className="p-4">
      <h2 className="text-center font-semibold mb-6 text-blue-600 text-2xl">Patient List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {patients.map((patient, index) => (
          <motion.div
            key={patient._id}
            className="p-4 w-80"
            initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly below
            animate={{ opacity: 1, y: 0 }}   // Final state: fully visible and at original position
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }} // Delay for each card with spring animation
          >
            <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-500">{patient.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Room:</span>
                  <span className="text-gray-500">{patient.roomNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Age:</span>
                  <span className="text-gray-500">{patient.age}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Gender:</span>
                  <span className="text-gray-500">{patient.gender}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Disease:</span>
                  <span className="text-gray-500">{patient.disease}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Allergies:</span>
                  <span className="text-gray-500">
                    {Array.isArray(patient.allergies)
                      ? patient.allergies.join(", ")
                      : patient.allergies || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Emergency Contact:</span>
                  <span className="text-gray-500">{patient.emergencyContact || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Additional Info:</span>
                  <span className="text-gray-500">{patient.additionalInfo || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Floor:</span>
                  <span className="text-gray-500">{patient.floorNumber || "N/A"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
