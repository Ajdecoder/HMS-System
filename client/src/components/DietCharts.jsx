import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, CardContent, Box, CircularProgress } from "@mui/material";
import { createDietChart, fetchDietCharts } from "../services/api";
import { motion } from "framer-motion";

const DietCharts = () => {
  const [dietChartsData, setDietChartsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true); 
  const modalRef = useRef(null);

  
  useEffect(() => {
    const getallDietCharts = async () => {
      try {
        const res = await fetchDietCharts();
        setDietChartsData(res.data);
      } catch (error) {
        console.error("Error fetching diet charts:", error);
      } finally {
        setLoading(false);
      }
    };

    getallDietCharts();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dietChartData = { morning, evening, night, instructions };

    try {
      const response = await createDietChart(dietChartData);
      console.log("Diet chart created:", response);
      setDietChartsData([response.data, ...dietChartsData]); 
      setMorning("");
      setEvening("");
      setNight("");
      setInstructions("");
      setIsOpen(false); 
    } catch (error) {
      console.error("Error creating diet chart:", error);
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-6">
      <h2 className="text-3xl font-semibold text-center text-sky-600 mb-8">
        Diet Charts
      </h2>
      <p className="text-lg text-center text-sky-600 mb-6">
        Browse through various diet charts designed to meet specific health
        goals and conditions.
      </p>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietChartsData.map((chart) => (
            <motion.div
              key={chart.id}
              className="bg-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <Box className="space-y-4">
                  <Typography variant="h6" className="text-sky-600 font-semibold mb-4">
                    Patient: {chart.id || chart._id}
                  </Typography>

                  <div className="flex justify-between">
                    <Typography variant="body1" className="font-medium text-gray-700">
                      Morning:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.morning}
                    </Typography>
                  </div>

                  <div className="flex justify-between">
                    <Typography variant="body1" className="font-medium text-gray-700">
                      Evening:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.evening}
                    </Typography>
                  </div>

                  <div className="flex justify-between">
                    <Typography variant="body1" className="font-medium text-gray-700">
                      Night:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.night}
                    </Typography>
                  </div>

                  <div className="flex justify-between">
                    <Typography variant="body1" className="font-medium text-gray-700">
                      Instructions:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.instructions}
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal to Add Diet Chart */}
      {isOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black opacity-90">
          <div
            ref={modalRef}
            className="mt-7 z-50 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
          >
            <Typography variant="h4" className="text-center mb-4 text-sky-600">
              Add Diet Chart
            </Typography>
            <form onSubmit={handleSubmit}>
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
            <div className="text-center mt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsOpen(false)} 
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Diet Chart Button */}
      <div className="mt-12 text-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-sky-600 bg-gradient-to-t from-indigo-700 to-cyan-400 text-white py-3 px-6 rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Add New Diet Chart
          </button>
        )}
      </div>
    </div>
  );
};

export default DietCharts;
