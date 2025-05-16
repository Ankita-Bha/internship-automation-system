import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 px-4">
      <div className="bg-white rounded-xl shadow-lg px-8 py-8 w-full max-w-md">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-blue-500 cursor-pointer mb-4 hover:underline"
        >
          &larr; Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">Create Your Account</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your information to get started</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">I am a</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              Student
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={formData.role === "employer"}
                onChange={handleChange}
              />
              Employer
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            onChange={handleChange}
            value={formData.username}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            onChange={handleChange}
            value={formData.password}
            className="w-full px-3 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <p className="text-xs text-gray-400 mb-4">
            Password must be at least 8 characters long with uppercase, lowercase, number, and special character.
          </p>

          <p className="text-xs text-gray-500 mb-4">
            By signing up, you agree to our <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
          </p>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded w-full hover:bg-orange-600 transition"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-50">
          Sign up with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
