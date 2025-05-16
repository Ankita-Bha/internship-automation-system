import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        const { access_token, username } = res.data;

        localStorage.setItem("token", access_token);
        localStorage.setItem("username", username);

        navigate("/"); // Just go back to landing page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1"
        >
          &larr; Back to Home
        </button>

        <h2 className="text-2xl font-bold mb-1 text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your credentials to access your account</p>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
            Password
            <button
              type="button"
              className="text-orange-500 text-xs hover:underline focus:outline-none"
              onClick={() => alert("Password reset flow here")}
            >
              Forgot password?
            </button>
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <label className="inline-flex items-center mb-4 text-sm text-gray-700">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            Remember me for 30 days
          </label>

          <button
            type="submit"
            className="bg-orange-500 w-full text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full border border-gray-300 py-2 rounded text-gray-700 hover:bg-gray-50 transition">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
