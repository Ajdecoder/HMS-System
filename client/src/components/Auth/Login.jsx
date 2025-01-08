import { Link, useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../services/api";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const {setLoggedInUser} = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { token } = response.data;
      const user = jwtDecode(token)
      setLoggedInUser(user);
      localStorage.setItem("Hfmtoken", token);
      toast.success("Login successful!");
      
      navigate("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dh8na8b9t/image/upload/v1717418908/shutterstock_126687977_edited_5c88ba0d7d.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        opacity: 0.5, 
        position: "relative", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
          style={{
            zIndex: 1, 
          }}
        >
         
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="mt-3">
            Don&apos;t have an account?{" "}
            <Link
              className="p-1 rounded-md hover:underline hover:text-red-500 duration-150"
              to="/auth/signup"
            >
              Signup here
            </Link>{" "}
          </p>
        </form>
        <ToastContainer autoClose='1000' />
      </div>
    </div>
  );
};

export default Login;
