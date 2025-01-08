import React, { useState, useEffect } from 'react';
import { fetchPatients } from '../services/api';
import { useAuth } from './context/AuthContext';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const {loggedInUser} = useAuth()

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await fetchPatients();
        setPatients(data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };
    getPatients();
  }, [loggedInUser]);

  return (
    <div className="p-4">
      <h3 className="text-center text-xl font-semibold mb-6">Patient List</h3>
      <div className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="p-4 bg-white rounded-lg shadow-lg space-y-3"
          >
            <div>
              <span className="font-semibold">Name:</span> {patient.name}
            </div>
            <div>
              <span className="font-semibold">Room:</span> {patient.roomNumber}
            </div>
            <div>
              <span className="font-semibold">Age:</span> {patient.age}
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {patient.gender}
            </div>
            <div>
              <span className="font-semibold">Disease:</span> {patient.disease}
            </div>
            <div>
              <span className="font-semibold">Allergies:</span>{' '}
              {patient.allergies.join(', ')}
            </div>
            <div>
              <span className="font-semibold">Emergency Contact:</span>{' '}
              {patient.emergencyContact}
            </div>
            <div>
              <span className="font-semibold">Additional Info:</span>{' '}
              {patient.additionalInfo}
            </div>
            <div>
              <span className="font-semibold">Floor:</span> {patient.floorNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
