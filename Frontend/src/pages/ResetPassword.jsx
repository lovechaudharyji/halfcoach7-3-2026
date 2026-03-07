import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSpinner, FaKey, FaArrowLeft } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineKey,
} from "react-icons/hi";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
    if (name === "newPassword") setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/reset-password",
      //   { email, otp, newPassword }
      // );
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      setMessage(response.data.msg);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("");
      setError(err.response ? err.response.data.msg : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaKey className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600">Create a new secure password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 font-medium mb-1 flex items-center"
            >
              <HiOutlineMail className="mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInput}
              className="mt-1 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm bg-gray-100"
              required
              disabled
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="otp"
              className="text-gray-700 font-medium mb-1 flex items-center"
            >
              <HiOutlineKey className="mr-2" />
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleInput}
              className="mt-1 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
              required
              autoComplete="one-time-code"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-gray-700 font-medium mb-1 flex items-center"
            >
              <HiOutlineLockClosed className="mr-2" />
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleInput}
              className="mt-1 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
              required
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
            />
          </div>

          {message && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg border-l-4 border-green-500">
              {message}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500 animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-3" />
                Updating...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            <FaArrowLeft className="mr-1" />
            Back to forgot password
          </button>
        </div>
      </div>
    </section>
  );
};