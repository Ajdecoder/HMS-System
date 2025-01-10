import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Select, MenuItem } from "@mui/material";
import { Map, Marker } from "react-map-gl";

const TrackDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    // Fetch deliveries (replace with your API)
    const fetchDeliveries = async () => {
      const response = await fetch("/api/deliveries");
      const data = await response.json();
      setDeliveries(data);
    };
    fetchDeliveries();
  }, []);

  const filteredDeliveries =
    filter === "All" ? deliveries : deliveries.filter((delivery) => delivery.status === filter);

  return (
    <Box p={3}>
      <Typography variant="h4" textAlign="center" color="primary">
        Track Deliveries
      </Typography>

      {/* Filter Dropdown */}
      <Box my={2}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} fullWidth>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="In Transit">In Progress</MenuItem>
        </Select>
      </Box>

      {/* Deliveries List */}
      <List>
        {filteredDeliveries.map((delivery) => (
          <ListItem
            key={delivery.id}
            button
            onClick={() => setSelectedDelivery(delivery)}
            sx={{
              mb: 1,
              backgroundColor: delivery.status === "Pending" ? "#FFEFD5" : "#E6F7E6",
              borderRadius: "8px",
            }}
          >
            <ListItemText
              primary={`Patient: ${delivery.patientName} - Room ${delivery.roomNumber}`}
              secondary={`Meal: ${delivery.mealType} | Status: ${delivery.status}`}
            />
          </ListItem>
        ))}
      </List>

      {/* Map for Route Visualization */}
      {selectedDelivery && (
        <Box mt={3}>
          <Typography variant="h6" color="secondary">
            Delivery Route for: {selectedDelivery.patientName}
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
              color="red"
            />
          </Map>
        </Box>
      )}
    </Box>
  );
};

export default TrackDeliveries;
