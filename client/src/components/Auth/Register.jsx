import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createUser } from "../../services/api";
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
      const response = await createUser(data);
      const token = response.data.token;

      if (response.status === 200) {
        toast.success("Signup successful");
        console.log(response);
        localStorage.setItem("Hfmtoken", response.data.token);
        toast.success("Login successful!");
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
    <div className="flex items-center mt-6">
      <img
        src="https://www.alphaebm.com/images/Hros/Alpha-HROS.jpg"
        alt="Hospital food delivery system logo"
        className="mb-4 max-w-3xl h-screen rounded-lg ml-3"
      />
      <div className="ml-11">
        <h1 className=" text-center text-2xl">Signup</h1>

        <form
          className="flex flex-col max-w-2xl w-full items-center"
          onSubmit={handleSignup}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            className="w-96"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            className="w-96"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            className="w-96"
            autoComplete="off"
            required
          />
          <TextField
            label="Role"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
            className="w-96"
            SelectProps={{ native: true }}
            required
          >
            <option value="food_manager">Food Manager</option>
            <option value="pantry_staff">Pantry Staff</option>
            <option value="delivery_personnel">Delivery Personnel</option>
          </TextField>

          {error && (
            <Typography color="error" className="mt-2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-96 mt-4"
          >
            Signup
          </Button>
        </form>

        <Typography className="mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </Typography>
      </div>

      <ToastContainer autoClose="1000" />
    </div>
  );
};

export default Signup;
