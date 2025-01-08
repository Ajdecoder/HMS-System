import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

// Sample diet chart data based on the schema provided
const dietCharts = [
  {
    id: 1,
    patientId: "1",
    morning: "Oatmeal with fruits",
    evening: "Grilled chicken with vegetables",
    night: "Herbal tea",
    instructions: "Eat at regular intervals and avoid processed sugars.",
  },
  {
    id: 2,
    patientId: "2",
    morning: "Scrambled eggs with toast",
    evening: "Baked salmon with salad",
    night: "Warm milk",
    instructions: "Ensure you drink plenty of water throughout the day.",
  },
  {
    id: 3,
    patientId: "3",
    morning: "Greek yogurt with honey",
    evening: "Steamed vegetables with rice",
    night: "Chamomile tea",
    instructions: "Avoid heavy meals before bedtime.",
  },
  {
    id: 4,
    patientId: "4",
    morning: "Smoothie with spinach and banana",
    evening: "Quinoa with roasted vegetables",
    night: "Peppermint tea",
    instructions: "Follow the diet strictly for best results.",
  },
];

const DietCharts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  const handleAddChartClick = () => {
    setIsOpen(!isOpen);
  };

  const [patientId, setPatientId] = useState("");
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dietChartData = {
      patientId,
      morning,
      evening,
      night,
      instructions,
    };

    // Here, you can add logic to send this data to the server.
    console.log("Diet Chart Data:", dietChartData);
  };

  useEffect(() => {
    // Close the modal if clicked outside
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6"  >
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Diet Charts
      </h2>
      <p className="text-lg text-center text-gray-700 mb-6">
        Browse through various diet charts designed to meet specific health
        goals and conditions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietCharts.map((chart) => (
          <div
            key={chart.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Diet Chart for Patient {chart.patientId}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <strong>Morning:</strong>
                <span>{chart.morning}</span>
              </div>
              <div className="flex justify-between">
                <strong>Evening:</strong>
                <span>{chart.evening}</span>
              </div>
              <div className="flex justify-between">
                <strong>Night:</strong>
                <span>{chart.night}</span>
              </div>
              <div className="flex justify-between">
                <strong>Instructions:</strong>
                <span>{chart.instructions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black opacity-85">
          <div  ref={modalRef} className="z-50 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Typography variant="h4" className="text-center mb-4">
              Add Diet Chart
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  label="Patient ID"
                  variant="outlined"
                  fullWidth
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Morning"
                  variant="outlined"
                  fullWidth
                  value={morning}
                  onChange={(e) => setMorning(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Evening"
                  variant="outlined"
                  fullWidth
                  value={evening}
                  onChange={(e) => setEvening(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Night"
                  variant="outlined"
                  fullWidth
                  value={night}
                  onChange={(e) => setNight(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Instructions"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mt-4 bg-gradient-to-l from-cyan-600 to-violet-600"
                >
                  Add Diet Chart
                </Button>
              </div>
            </form>
            {/* Close Button */}
            <div className="text-center mt-4 ">
              <Button
                variant="outlined"
                color="secondary"
                className=""
                onClick={handleAddChartClick}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        {!isOpen && (
          <button
            onClick={handleAddChartClick}
            className="bg-blue-600 bg-gradient-to-t from-indigo-700 to-cyan-400 text-white py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New Diet Chart
          </button>
        )}
      </div>
    </div>
  );
};

export default DietCharts;
