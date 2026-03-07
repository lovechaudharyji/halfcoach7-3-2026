
import { useState } from "react";
import Lottie from "lottie-react";
import Logins from "../assets/login.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../redux/coachSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner, FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiArrowLeft } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";


export const Coachlogin = () => {
  const [coach, setCoach] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.coach);
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCoach({
      ...coach,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/coach/login",
      //   {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/coach/login`,
          {
          email: coach.email,
          password: coach.password,
        }
      );

      dispatch(
        loginSuccess({
          coach: {
            name: response.data.name,
            email: response.data.email,
            coachType: response.data.coachType,
            country: response.data.country,
            experience: response.data.experience,
            qualifications: response.data.qualifications,
            languages: response.data.languages,
            specialization: response.data.specialization,
            availability: response.data.availability,
            hourlyRate: response.data.hourlyRate,
            phoneNumber: response.data.phoneNumber,
            address: response.data.address,
            city: response.data.city,
            state: response.data.state,
            zipCode: response.data.zipCode,
            socialMediaLinks: response.data.socialMediaLinks,
            certifications: response.data.certifications,
            bio: response.data.bio,
            profilePicture: response.data.profilePicture,
            website: response.data.website,
            additionalNotes: response.data.additionalNotes,
            services: response.data.services,
          },
          token: response.data.token,
        })
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("coach", JSON.stringify(response.data));

      setCoach({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      dispatch(loginFailure("Invalid credentials or server error"));
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 animate-fadeIn">
      <main className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl p-8 md:p-12 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        {/* Animation Section */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center p-4">
          <div className="w-[300px] md:w-[500px] lg:w-[600px] transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <Lottie animationData={Logins} loop={true} />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FaChalkboardTeacher className="text-5xl text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              Coach Portal
            </h1>
            <p className="text-gray-600">Sign in to your coaching account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-shake">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                  name="email"
                  placeholder="Enter your email"
                  id="email"
                  required
                  autoComplete="off"
                  value={coach.email}
                  onChange={handleInput}
                  className="mt-1 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                />
              </div>

              {/* <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-medium mb-1 flex items-center"
                >
                  <HiOutlineLockClosed className="mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  required
                  autoComplete="off"
                  value={coach.password}
                  onChange={handleInput}
                  className="mt-1 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                />
              </div> */}
              <div className="flex flex-col relative">
  <label
    htmlFor="password"
    className="text-gray-700 font-medium mb-1 flex items-center"
  >
    <HiOutlineLockClosed className="mr-2" />
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    id="password"
    required
    autoComplete="off"
    value={coach.password}
    onChange={handleInput}
    className="mt-1 px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[48px] cursor-pointer text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </span>
</div>

            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

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
                  Authenticating...
                </span>
              ) : (
                "Login as Coach"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              <FiArrowLeft className="mr-1" />
              Back to regular login
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};