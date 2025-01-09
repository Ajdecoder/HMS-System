import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const FoodManagerDashboard = () => {
  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-3xl font-semibold text-center text-blue-600 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Hospital Food Manager Dashboard
      </motion.h1>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Total Diet Plans
                </Typography>
                <Typography variant="h6" className="text-gray-500">
                  120 active diet charts
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Pending Orders
                </Typography>
                <Typography variant="h6" className="text-gray-500">
                  15 pending deliveries
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Alerts
                </Typography>
                <Typography variant="h6" className="text-red-600">
                  3 patients have special instructions today.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                className="py-3 text-lg font-semibold hover:bg-red-700 transition-colors bg-gradient-to-r from-sky-600 to-orange-600"
              >
                View Diet Charts
              </Button>
            </div>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default FoodManagerDashboard;
