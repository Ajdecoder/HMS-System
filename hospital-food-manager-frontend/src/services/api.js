import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6010", // Update with your backend URL
});

// Add authorization token if needed
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const token = localStorage.getItem("Hfmtoken");

// API Endpoints
export const fetchPatients = async () => {
  const response = await API.get("/patients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  return response;
};
export const createPatient = (data) =>
  API.post("/patients", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const createUser = async (data) => {
  try {
    const response = await API.post("auth/register", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
export const loginUser = async (data) => {
  try {
    const response = await API.post("auth/login", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
