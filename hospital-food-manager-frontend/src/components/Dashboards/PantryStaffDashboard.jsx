import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const PantryStaffDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Inner Pantry Staff Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Pending Preparations
              </Typography> 
              <Typography variant="h6" color="textSecondary">
                20 meals to prepare
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Meals In Progress
              </Typography>
              <Typography variant="h6" color="textSecondary">
                5 meals in progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Special Instructions
              </Typography>
              <Typography variant="h6" color="error">
                3 patients with special dietary needs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            View Meal Details
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PantryStaffDashboard;
