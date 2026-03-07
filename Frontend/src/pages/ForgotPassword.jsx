import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/forgot-password",
      //   { email }
      // );
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(response.data.msg);
      setError("");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      setMessage("");
      setError(err.response ? err.response.data.msg : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaEnvelope className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-600">
            Enter your email to receive a reset OTP
          </p>
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
              className="mt-1 px-4 py-3 pl-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
              required
              autoComplete="email"
            />
          </div>

          {loading && (
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center">
              <FaSpinner className="animate-spin mr-3" />
              Sending OTP to your email...
            </div>
          )}

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
                Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            <FaArrowLeft className="mr-1" />
            Back to login
          </button>
        </div>
      </div>
    </section>
  );
};