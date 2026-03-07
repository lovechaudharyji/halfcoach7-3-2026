
import { useState } from "react";
import Lottie from "lottie-react";
import Logins from "../assets/login.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaGoogle, FaSpinner } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
          {
          email: user.email,
          password: user.password,
        }
      );
      dispatch(
        loginSuccess({
          user: {
            username: response.data.username,
            email: response.data.email,
            isAdmin: response.data.isAdmin,
            userId: response.data.userId,
          },
          phone: response.data.phone,
          token: response.data.token,
        })
      );
      console.log("Login Successfull", response.data);
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
    <section className="flex justify-center items-center h-[92vh] bg-gradient-to-br from-gray-900 to-gray-800 animate-fadeIn">
      <main className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl p-8 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        {/* Animation Section */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center p-4">
          <div className="w-[300px] md:w-[500px] lg:w-[600px] transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <Lottie animationData={Logins} loop={true} />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 animate-pulse">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
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
                  value={user.email}
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
                  value={user.password}
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
    value={user.password}
    onChange={handleInput}
    className="mt-1 px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </button>
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
                to="/forgot-password"
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
                  Processing...
                </span>
              ) : (
                "Login Now"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Dont have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
             
            </div>



            {/* <Link
              to="/coachlogin"
              className="mt-4 inline-block  text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              <FiUser className="inline mr-1" />
              Are you a coach? Login here
            </Link> */}
            <Link to="/coachlogin" className="mt-4 inline-block">
  <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
    <FiUser className="mr-2" />
    Are you a coach? Login here
  </button>
</Link>
          </div>
        </div>
      </main>
    </section>
  );
};
