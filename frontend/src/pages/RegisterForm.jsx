import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",  // Make sure it's 'username' to match backend
    email: "",
    password: "",
    role: "student", // Default role
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);  // Debugging line to check form data
      const res = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: {
          "Content-Type": "application/json",  // Ensure correct content type
        },
      });

      if (res.status === 201) {
        navigate("/login"); // Redirect to login
      }
    } catch (err) {
      console.error(err.response?.data);  // Log error for debugging
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          name="username"  // Ensure this is 'username'
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.username}  // Ensure this matches the state name
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600">
          Register
        </button>
      </form>
    </div>
  );
}
