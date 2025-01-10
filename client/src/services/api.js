import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:6010", // Update with your backend URL
});

// Add Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("Hfmtoken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



// Patients
export const fetchPatients = async () => API.get("/api/v1/patients");

export const fetchPatientById = async (id) => API.get(`/api/v1/patients/${id}`);

export const createPatient = async (data) => API.post("/api/v1/patients", data);

export const updatePatientById = async (id, data) =>
  API.put(`/api/v1/patients/${id}`, data);

export const deletePatientById = async (id) =>
  API.delete(`/api/v1/patients/${id}`);



// Diet Charts
export const fetchDietCharts = async () => API.get("/api/v1/diet-charts");

export const fetchDietChartByPatientId = async (patientId) =>
  API.get(`/api/v1/diet-charts/${patientId}`);

export const createDietChart = async (data) =>
  API.post("/api/v1/diet-charts", data);

export const updateDietChartById = async (id, data) =>
  API.put(`/api/v1/diet-charts/${id}`, data);

export const deleteDietChartById = async (id) =>
  API.delete(`/api/v1/diet-charts/${id}`);

// Pantry Staff
export const fetchPantryStaff = async () => API.get("/api/v1/pantry");

export const fetchPantryStaffById = async (id) =>
  API.get(`/api/v1/pantry/${id}`);

export const addPantryStaff = async (data) => API.post("/api/v1/pantry", data);

export const updatePantryStaffById = async (id, data) =>
  API.put(`/api/v1/pantry/${id}`, data);

export const deletePantryStaffById = async (id) =>
  API.delete(`/api/v1/pantry/${id}`);

// Fetch pending preparations
export const fetchPendingPreparations = async () => {
  const response = await API.get("/api/v1/meal-deliveries"); // Assuming this API returns the provided data structure
  const pendingPreparations = response.data.filter(
    (meal) =>
      meal.preparationStatus !== "completed" && meal.deliveryStatus !== "delivered"
  );
  return pendingPreparations; // Returns array of pending meal preparations
};

// Fetch Inprogress meal

export const fetchInProgressMeals = async () => {
  const response = await API.get("/api/v1/meal-deliveries");
  const inProgressMeals = response.data.filter(
    (meal) => meal.preparationStatus === "in progress"
  );
  return inProgressMeals;
};


// Fetch special instructions for diet charts
export const fetchSpecialInstructions = async () => {
  const response = await API.get("/api/v1/diet-charts");
  const specialInstructions = response.data.filter(
    (chart) => chart.instructions && chart.instructions.trim().length > 0
  );
  return specialInstructions;
};



// Meal Deliveries
export const fetchMealDeliveries = async () => API.get("/api/v1/meal-deliveries");

export const fetchMealDeliveryById = async (id) =>
  API.get(`/api/v1/meal-deliveries/${id}`);

export const assignMealDelivery = async (data) =>
  API.post("/api/v1/meal-deliveries", data);

export const updateMealDeliveryById = async (id, data) =>
  API.put(`/api/v1/meal-deliveries/${id}`, data);

// User Authentication
export const loginUser = async (data) => API.post("/auth/login", data);

export const registerUser = async (data) =>
  API.post("/auth/register", data);



