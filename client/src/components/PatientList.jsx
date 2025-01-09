import React, { useState, useEffect } from "react";
import { fetchPatients } from "../services/api";
import { useAuth } from "./context/AuthContext";
import { Card, CardContent, Typography, Divider } from "@mui/material";

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
    getPatients();
  }, [loggedInUser]);

  return (
    <div className="p-4">
    <Typography
      variant="h5"
      className="text-center font-semibold mb-6 text-blue-600"
    >
      Patient List
    </Typography>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {patients.map((patient) => (
        <Card
          key={patient._id}
          className="p-4 bg-white max-w-xl rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          sx={{ borderRadius: 2 }}
        >
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Name:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.name}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Room:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.roomNumber}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Age:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.age}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Gender:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.gender}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Disease:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.disease}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Allergies:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.allergies.join(", ")}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Emergency Contact:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.emergencyContact}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Additional Info:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.additionalInfo}
                </Typography>
              </div>
  
              <div className="flex justify-between">
                <Typography
                  variant="body1"
                  className="font-semibold text-gray-700"
                >
                  Floor:
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {patient.floorNumber}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  
  );
};

export default PatientList;
