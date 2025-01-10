import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { fetchPendingPreparations, fetchSpecialInstructions, fetchInProgressMeals } from "../../services/api";

const PantryStaffDashboard = () => {
  const [pendingPreparations, setPendingPreparations] = useState(0);
  const [mealsInProgress, setMealsInProgress] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState(0);

  useEffect(() => {
    const getPantryStaffData = async () => {
      try {
        // Fetch pending preparations
        const pendingRes = await fetchPendingPreparations();
        
        setPendingPreparations(pendingRes.length);
        
        // Fetch meals in progress (assuming API provides this info)
        
        const inprogressRes = await fetchInProgressMeals();
        
        setMealsInProgress(inprogressRes.length);

        
        // Fetch special instructions
        const instructionsRes = await fetchSpecialInstructions();
        setSpecialInstructions(instructionsRes.length);
        console.log(instructionsRes)

        
      } catch (error) {
        console.error("Error fetching pantry staff data:", error);
      }
    };

    getPantryStaffData();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Inner Pantry Staff Dashboard
      </motion.h1>

      <Grid container spacing={4}>
        {/* Total Pending Preparations */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <Typography variant="h5" className="font-semibold text-gray-800 mb-2">
                  Total Pending Preparations
                </Typography>
                <Typography variant="h6" className="text-gray-600">
                  {pendingPreparations} meals to prepare
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Meals In Progress */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <Typography variant="h5" className="font-semibold text-gray-800 mb-2">
                  Meals In Progress
                </Typography>
                <Typography variant="h6" className="text-gray-600">
                  {mealsInProgress} meals in progress
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Special Instructions */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <Typography variant="h5" className="font-semibold text-gray-800 mb-2">
                  Special Instructions
                </Typography>
                <Typography variant="h6" className="text-red-500">
                  {specialInstructions} patients with special dietary needs
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* View Meal Details Button */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center">
              <Button
                variant="contained"
                className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-full shadow-lg transition-all"
                onClick={() => console.log("Navigate to meal details")}
              >
                View Meal Details
              </Button>
            </div>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default PantryStaffDashboard;
