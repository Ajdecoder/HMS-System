import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, Card, CardContent, Box } from "@mui/material";
import { createDietChart, GetAllCharts } from "../services/api";

// Sample diet chart data based on the schema provided
const dietCharts = [
  {
    id: "60d21b4667d0d8992e610c85",
    morning: "Whole grain toast with avocado and poached egg",
    evening: "Grilled chicken breast with quinoa and steamed broccoli",
    night: "Chamomile tea with a slice of whole grain bread",
    instructions: "Maintain hydration and avoid high-sugar snacks.",
  },
  {
    id: "60d21b4667d0d8992e610c86",
    morning: "Smoothie with kale, banana, and almond milk",
    evening: "Baked salmon with a side of mixed greens and cherry tomatoes",
    night: "Warm almond milk with a pinch of cinnamon",
    instructions: "Incorporate more leafy greens into meals.",
  },
  {
    id: "60d21b4667d0d8992e610c87",
    morning: "Greek yogurt with mixed berries and a sprinkle of flaxseeds",
    evening: "Stir-fried tofu with bell peppers and brown rice",
    night: "Peppermint tea with a small handful of nuts",
    instructions: "Focus on plant-based proteins and whole grains.",
  },
  {
    id: "60d21b4667d0d8992e610c88",
    morning: "Oatmeal topped with sliced almonds and fresh strawberries",
    evening: "Lentil soup with a side of whole grain bread",
    night: "Herbal tea with a small piece of dark chocolate",
    instructions: "Limit caffeine intake and opt for herbal teas.",
  },
];

const DietCharts = () => {
  const [dietChartsData, setDietChartsData] = useState(dietCharts);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleAddChartClick = () => {
    setIsOpen(!isOpen);
  };

  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietChartData = {
      morning,
      evening,
      night,
      instructions,
    };

    const response = await createDietChart(dietChartData);
    console.log(response);
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


  useEffect(() => {
    // Fetch diet chart data from the API
    const fetchDietCharts = async () => {
      try {
        const res = await GetAllCharts();
        console.log("Fetched Diet Charts:", res.data);
        setDietChartsData((prevData) => [...prevData, ...res.data]);
      } catch (error) {
        console.error("Error fetching diet charts:", error);
      }
    };
  
    fetchDietCharts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Diet Charts
      </h2>
      <p className="text-lg text-center text-gray-700 mb-6">
        Browse through various diet charts designed to meet specific health
        goals and conditions.
      </p>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {dietChartsData.map((chart) => (
    <Card
      key={chart.id}
      className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      sx={{ borderRadius: 2 }}
    >
      <CardContent className="p-6">
        <Box className="space-y-4">
          <Typography
            variant="h6"
            className="text-blue-600 font-semibold mb-4"
            gutterBottom
          >
            Patient: {chart.id||chart._id}
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
    </Card>
  ))}
</div>

      {isOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black opacity-70">
          <div
            ref={modalRef}
            className="mt-7 z-50 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
          >
            <Typography variant="h4" className="text-center mb-4 text-blue-600">
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
            {/* Close Button */}
            <div className="text-center mt-4">
              <Button
                variant="outlined"
                color="secondary"
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
