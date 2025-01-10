import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { registerUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("food_manager");
  const [error, setError] = useState("");
  const { setLoggedInUser } = useAuth();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = { name, email, password, role };
    try {
      const response = await registerUser(data);
      const token = response.data.token;

      if (response.status === 200) {
        toast.success("Signup successful");
        localStorage.setItem("Hfmtoken", response.data.token);
        const user = jwtDecode(token);
        setLoggedInUser(user);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center mt-6 p-4">
      <img
        src="https://www.alphaebm.com/images/Hros/Alpha-HROS.jpg"
        alt="Hospital food delivery system logo"
        className="mb-4 max-w-full xl:max-w-3xl xl:h-screen rounded-lg w-full xl:w-1/2 object-cover"
      />
      <div className="ml-0 xl:ml-11 w-full xl:w-1/2">
        <h1 className="text-center text-2xl xl:text-3xl font-semibold mb-4">
          Signup
        </h1>

        <form
          className="flex flex-col items-center max-w-lg mx-auto w-full"
          onSubmit={handleSignup}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            className="w-full xl:w-96"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            className="w-full xl:w-96"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            className="w-full xl:w-96"
            autoComplete="off"
            required
          />
          <TextField
            label="Role"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
            className="w-full xl:w-96"
            SelectProps={{ native: true }}
            required
          >
            <option value="food_manager">Food Manager</option>
            <option value="pantry_staff">Pantry Staff</option>
            <option value="delivery_personnel">Delivery Personnel</option>
          </TextField>

          {error && (
            <Typography color="error" className="mt-2 text-center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full xl:w-96 mt-4"
          >
            Signup
          </Button>
        </form>

        <Typography className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </Typography>
      </div>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Signup;
