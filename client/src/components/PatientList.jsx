import React, { useState, useEffect } from "react";
import { fetchPatients } from "../services/api";
import { useAuth } from "./context/AuthContext";
import { motion } from "framer-motion"; // Import framer-motion

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-center font-semibold mb-8 text-3xl text-blue-700">
        Patient List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {patients.map((patient, index) => (
          <motion.div
            key={patient._id}
            className="p-4 w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          >
            <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Name:
                  </span>
                  <span className="text-gray-600 text-end">{patient.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Room:
                  </span>
                  <span className="text-gray-600 text-end">{patient.roomNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Age:
                  </span>
                  <span className="text-gray-600 text-end">{patient.age}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Gender:
                  </span>
                  <span className="text-gray-600 text-end">{patient.gender}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Disease:
                  </span>
                  <span className="text-gray-600 text-end">{patient.disease}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Allergies:
                  </span>
                  <span className="text-gray-600 text-end">
                    {Array.isArray(patient.allergies)
                      ? patient.allergies.join(", ")
                      : patient.allergies || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Emergency Contact:
                  </span>
                  <span className="text-gray-600 text-end">
                    {patient.emergencyContact || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Additional Info:
                  </span>
                  <span className="text-gray-600 text-end ">
                    {patient.additionalInfo || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-lg text-gray-700">
                    Floor:
                  </span>
                  <span className="text-gray-600 text-end">
                    {patient.floorNumber || "N/A"}
                  </span>
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
