import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const existingUser = users.find((u) => u.email === formData.email);

    if (existingUser) {
      alert("User already registered! Please login.");
      navigate("/login");
      return;
    }

    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4 bg-light shadow"
        style={{ width: "400px" }}
      >
        <h3 className="text-center text-danger mb-4 fw-bold">Create Account</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100 mt-2">
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
