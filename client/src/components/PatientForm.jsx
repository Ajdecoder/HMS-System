  import React, { useState } from 'react';
  import { createPatient } from '../services/api';

  const PatientForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      disease: '',
      allergies: '',
      roomNumber: '', 
      age: '',
      gender: '',
      contactInfo: '',
      emergencyContact: '',
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createPatient(formData);
        alert('Patient added successfully!');
        setFormData({
          name: '',
          disease: '',
          allergies: '',
          roomNumber: '',
          age: '',
          gender: '',
          contactInfo: '',
          emergencyContact: '',
        });
      } catch (err) {
        console.error('Error creating patient:', err);
        alert('Failed to add patient. Please try again.');
      }
    };

    return (
      <div className="flex justify-center items-center min-h-100 mt-3 bg-gray-50 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6 mb-4 mt-4"
        >
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            Add New Patient
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter patient's name"
                required
                className="w-[22rem] p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="disease" className="block text-sm font-medium text-gray-700">Disease</label>
              <input
                id="disease"
                name="disease"
                type="text"
                value={formData.disease}
                onChange={handleChange}
                placeholder="Enter patient's disease"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
              <input
                id="allergies"
                name="allergies"
                type="text"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Enter any allergies (optional)"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
              <input
                id="roomNumber"
                name="roomNumber"
                type="text"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Enter room number"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter patient's age"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info</label>
              <input
                id="contactInfo"
                name="contactInfo"
                type="text"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Enter contact info"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                id="emergencyContact"
                name="emergencyContact"
                type="text"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Enter emergency contact info"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-t from-indigo-700 "
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default PatientForm;
