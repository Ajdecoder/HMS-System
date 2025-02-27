import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Select, MenuItem } from "@mui/material";
import { Map, Marker } from "react-map-gl";
import { fetchMealDeliveries, updateMealDeliveryById } from "../services/api";

export const MealDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    // Fetch meal deliveries (replace with your API)
    const fetchDeliveries = async () => {
      const response = await fetchMealDeliveries()
      console.log(response)
      setDeliveries(response.data);
    };
    fetchDeliveries();
  }, []);

  const updateStatus = async (id, newStatus) => {
    // Update delivery status (API call)
    const response = await updateMealDeliveryById(id)
    if (response.ok) {
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === id ? { ...delivery, status: newStatus } : delivery
        )
      );
    }
  };

  const filteredDeliveries =
    filter === "All" ? deliveries : deliveries.filter((delivery) => delivery.status === filter);

    // console.log(filteredDeliveries)

  return (
    <Box p={3}>
      <Typography variant="h4" textAlign="center" color="primary">
        Meal Deliveries
      </Typography>

      {/* Filter Dropdown */}
      <Box my={2}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} fullWidth>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Transit">In Transit</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      </Box>

      {/* Deliveries List */}
      <List>
        {filteredDeliveries.map((delivery) => (
          <ListItem
            key={delivery.id}
            sx={{
              mb: 1,
              backgroundColor:
                delivery.status === "Pending"
                  ? "#FFEFD5"
                  : delivery.status === "In Transit"
                  ? "#FFFAF0"
                  : "#E6F7E6",
              borderRadius: "8px",
            }}
          >
            {console.log(delivery)}
            <ListItemText
              primary={`Patient: ${delivery.patientName} - Room ${delivery.roomNumber}`}
              secondary={`Meal: ${delivery.mealType} | Status: ${delivery.status}`}
            />
            <Box>
              {delivery.status !== "Delivered" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    updateStatus(delivery.id, delivery.status === "Pending" ? "In Transit" : "Delivered")
                  }
                >
                  {delivery.status === "Pending" ? "Mark as In Transit" : "Mark as Delivered"}
                </Button>
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Map for Deliveries */}
      {selectedDelivery && (
        <Box mt={3}>
          <Typography variant="h6" color="secondary">
            Route for: {selectedDelivery.patientName}
          </Typography>
          <Map
            initialViewState={{
              latitude: selectedDelivery.location.lat,
              longitude: selectedDelivery.location.lng,
              zoom: 14,
            }}
            style={{ width: "100%", height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
          >
            <Marker
              latitude={selectedDelivery.location.lat}
              longitude={selectedDelivery.location.lng}
              color="blue"
            />
          </Map>
        </Box>
      )}
    </Box>
  );
};
