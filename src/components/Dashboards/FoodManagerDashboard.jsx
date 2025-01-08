import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const FoodManagerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Hospital Food Manager Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Diet Plans
              </Typography>
              <Typography variant="h6" color="textSecondary">
                120 active diet charts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pending Orders
              </Typography>
              <Typography variant="h6" color="textSecondary">
                15 pending deliveries
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Alerts
              </Typography>
              <Typography variant="h6" color="error">
                3 patients have special instructions today.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            View Diet Charts
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FoodManagerDashboard;
