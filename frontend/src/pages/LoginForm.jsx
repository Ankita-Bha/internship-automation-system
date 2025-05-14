import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", formData);
      if (res.status === 200) {
        // Store the JWT token in localStorage (or use sessionStorage)
        localStorage.setItem("token", res.data.access_token);

        // Redirect to the dashboard page after successful login
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle errors such as invalid credentials
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
