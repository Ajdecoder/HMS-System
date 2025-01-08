import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const DeliveryPersonnelDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Delivery Personnel Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pending Deliveries
              </Typography>
              <Typography variant="h6" color="textSecondary">
                10 meals to deliver
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                In-Progress Deliveries
              </Typography>
              <Typography variant="h6" color="textSecondary">
                4 deliveries in progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Completed Deliveries
              </Typography>
              <Typography variant="h6" color="textSecondary">
                6 meals delivered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Track Deliveries
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryPersonnelDashboard;
