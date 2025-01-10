import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  IconButton,
} from "@mui/material";
import { createDietChart, fetchDietCharts } from "../services/api";
import { motion } from "framer-motion";
import { Add, Remove } from "@mui/icons-material"; // For adding/removing ingredients

const DietCharts = () => {
  const [dietChartsData, setDietChartsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [morningMeal, setMorningMeal] = useState("");
  const [morningIngredients, setMorningIngredients] = useState([]);
  const [eveningMeal, setEveningMeal] = useState("");
  const [eveningIngredients, setEveningIngredients] = useState([]);
  const [nightMeal, setNightMeal] = useState("");
  const [nightIngredients, setNightIngredients] = useState([]);
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
    const dietChartData = {
      morning: { meal: morningMeal, ingredients: morningIngredients },
      evening: { meal: eveningMeal, ingredients: eveningIngredients },
      night: { meal: nightMeal, ingredients: nightIngredients },
      instructions,
    };

    try {
      const response = await createDietChart(dietChartData);
      setDietChartsData([response.data, ...dietChartsData]);
      setMorningMeal("");
      setMorningIngredients([]);
      setEveningMeal("");
      setEveningIngredients([]);
      setNightMeal("");
      setNightIngredients([]);
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

  // Functions to handle adding/removing ingredients
  const handleAddIngredient = (mealType) => {
    const ingredient = prompt("Enter ingredient:");
    if (ingredient) {
      if (mealType === "morning") {
        setMorningIngredients([...morningIngredients, ingredient]);
      } else if (mealType === "evening") {
        setEveningIngredients([...eveningIngredients, ingredient]);
      } else if (mealType === "night") {
        setNightIngredients([...nightIngredients, ingredient]);
      }
    }
  };

  const handleRemoveIngredient = (mealType, ingredient) => {
    if (mealType === "morning") {
      setMorningIngredients(morningIngredients.filter((item) => item !== ingredient));
    } else if (mealType === "evening") {
      setEveningIngredients(eveningIngredients.filter((item) => item !== ingredient));
    } else if (mealType === "night") {
      setNightIngredients(nightIngredients.filter((item) => item !== ingredient));
    }
  };
  {console.log(dietChartsData)}

  return (
    <div className="min-h-full bg-gray-950 py-10 px-6">
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
              key={chart._id}
              className="bg-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <CardContent className="p-6">
                <Box className="space-y-4">
                  <Typography
                    variant="h6"
                    className="text-sky-600 font-semibold mb-4"
                  >
                    Patient: {chart.patientId?.name || "Unknown"}
                  </Typography>

                  {/* Morning Meal */}
                  <div>
                    <Typography
                      variant="body1"
                      className="font-extrabold text-black "
                    >
                      Morning:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.morning?.meal || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 italic"
                    >
                      Ingredients:{" "}
                      {chart.morning?.ingredients.join(", ") || "N/A"}
                    </Typography>
                  </div>

                  {/* Evening Meal */}
                  <div>
                    <Typography
                      variant="body1"
                      className="font-medium text-gray-700"
                    >
                      Evening:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.evening?.meal || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 italic"
                    >
                      Ingredients:{" "}
                      {chart.evening?.ingredients.join(", ") || "N/A"}
                    </Typography>
                  </div>

                  {/* Night Meal */}
                  <div>
                    <Typography
                      variant="body1"
                      className="font-medium text-gray-700"
                    >
                      Night:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.night?.meal || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 italic"
                    >
                      Ingredients:{" "}
                      {chart.night?.ingredients.join(", ") || "N/A"}
                    </Typography>
                  </div>

                  {/* Instructions */}
                  <div>
                    <Typography
                      variant="body1"
                      className="font-medium text-gray-700"
                    >
                      Instructions:
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {chart.instructions || "N/A"}
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
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black opacity-90 overflow-y-scroll">
          <div
            ref={modalRef}
            className="mt-7 z-50 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg "
          >
            <Typography variant="h4" className="text-center mb-4 text-sky-600">
              Add Diet Chart
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Morning Meal */}
              <div className="mb-4">
                <TextField
                  label="Morning Meal"
                  variant="outlined"
                  fullWidth
                  value={morningMeal}
                  onChange={(e) => setMorningMeal(e.target.value)}
                />
              </div>

              {/* Add Ingredients for Morning */}
              <div className="mb-4">
                <Typography variant="body1" className="text-gray-700">
                  Morning Ingredients:
                </Typography>
                {morningIngredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient("morning", ingredient)}
                    color="primary"
                    className="mr-2 mb-2"
                  />
                ))}
                <IconButton onClick={() => handleAddIngredient("morning")}>
                  <Add color="primary" />
                </IconButton>
              </div>

              {/* Evening Meal */}
              <div className="mb-4">
                <TextField
                  label="Evening Meal"
                  variant="outlined"
                  fullWidth
                  value={eveningMeal}
                  onChange={(e) => setEveningMeal(e.target.value)}
                />
              </div>

              {/* Add Ingredients for Evening */}
              <div className="mb-4">
                <Typography variant="body1" className="text-gray-700">
                  Evening Ingredients:
                </Typography>
                {eveningIngredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient("evening", ingredient)}
                    color="primary"
                    className="mr-2 mb-2"
                  />
                ))}
                <IconButton onClick={() => handleAddIngredient("evening")}>
                  <Add color="primary" />
                </IconButton>
              </div>

              {/* Night Meal */}
              <div className="mb-4">
                <TextField
                  label="Night Meal"
                  variant="outlined"
                  fullWidth
                  value={nightMeal}
                  onChange={(e) => setNightMeal(e.target.value)}
                />
              </div>

              {/* Add Ingredients for Night */}
              <div className="mb-4">
                <Typography variant="body1" className="text-gray-700">
                  Night Ingredients:
                </Typography>
                {nightIngredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient("night", ingredient)}
                    color="primary"
                    className="mr-2 mb-2"
                  />
                ))}
                <IconButton onClick={() => handleAddIngredient("night")}>
                  <Add color="primary" />
                </IconButton>
              </div>

              {/* Instructions */}
              <div className="mb-4">
                <TextField
                  label="Instructions"
                  variant="outlined"
                  fullWidth
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  multiline
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="py-3 text-lg font-semibold hover:bg-red-700 transition-colors bg-gradient-to-r from-sky-600 to-orange-600 w-full"
                >
                  Add Diet Chart
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Button to Open Modal */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
          color="secondary"
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-blue-700 transition duration-300"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default DietCharts;
