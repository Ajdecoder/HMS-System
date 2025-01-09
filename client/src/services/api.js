import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:6010", // Update with your backend URL
});

// Add Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("Hfmtoken");
  console.log(token)
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Patients
export const fetchPatients = async () => API.get("/patients");

export const fetchPatientById = async (id) => API.get(`/patients/${id}`);

export const createPatient = async (data) => API.post("/patients", data);

export const updatePatientById = async (id, data) =>
  
  API.put(`/patients/${id}`, data);
export const deletePatientById = async (id) => API.delete(`/patients/${id}`);


// Diet Charts
export const fetchDietCharts = async () => API.get("/api/v1/diet-charts");

export const fetchDietChartByPatientId = async (patientId) =>
  
  API.get(`/diet-charts/${patientId}`);
export const createDietChart = async (data) => API.post("/diet-charts", data);

export const updateDietChartById = async (id, data) =>
  
  API.put(`/diet-charts/${id}`, data);
export const deleteDietChartById = async (id) =>
  
  API.delete(`/diet-charts/${id}`);

// Pantry Staff
export const fetchPantryStaff = async () => API.get("/pantry");

export const fetchPantryStaffById = async (id) => API.get(`/pantry/${id}`);

export const addPantryStaff = async (data) => API.post("/pantry", data);

export const updatePantryStaffById = async (id, data) =>
  
  API.put(`/pantry/${id}`, data);
export const deletePantryStaffById = async (id) =>
  
  API.delete(`/pantry/${id}`);

// Meal Deliveries
export const fetchMealDeliveries = async () => API.get("/meal-deliveries");

export const fetchMealDeliveryById = async (id) =>
  
  API.get(`/meal-deliveries/${id}`);
export const assignMealDelivery = async (data) =>
  
  API.post("/meal-deliveries", data);
export const updateMealDeliveryById = async (id, data) =>
  
  API.put(`/meal-deliveries/${id}`, data);

// User Authentication
export const loginUser = async (data) => API.post("auth/login", data);

export const registerUser = async (data) => API.post("auth/register", data);

