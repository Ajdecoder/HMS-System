import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const PantryStaffDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Inner Pantry Staff Dashboard
      </h1>
      <Grid container spacing={4}>
        {/* Total Pending Preparations */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <Typography
                variant="h5"
                className="font-semibold text-gray-800 mb-2"
              >
                Total Pending Preparations
              </Typography>
              <Typography variant="h6" className="text-gray-600">
                20 meals to prepare
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Meals In Progress */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <Typography
                variant="h5"
                className="font-semibold text-gray-800 mb-2"
              >
                Meals In Progress
              </Typography>
              <Typography variant="h6" className="text-gray-600">
                5 meals in progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Special Instructions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <Typography
                variant="h5"
                className="font-semibold text-gray-800 mb-2"
              >
                Special Instructions
              </Typography>
              <Typography variant="h6" className="text-red-500">
                3 patients with special dietary needs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* View Meal Details Button */}
        <Grid item xs={12}>
          <div className="text-center">
            <Button
              variant="contained"
              className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-full shadow-lg transition-all"
            >
              View Meal Details
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PantryStaffDashboard;
