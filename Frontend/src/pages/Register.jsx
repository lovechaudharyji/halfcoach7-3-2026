

import { useState } from "react";
import Lottie from "lottie-react";
import Sign from "../assets/Signup.json";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";


// zeeeod schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(255, { message: "Password must not be more than 255 characters" }),
});

// const URL = "http://localhost:5000/api/auth/register";
const URL = `${import.meta.env.VITE_BASE_URL}/api/auth/register`;

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Zod validation
    const result = signupSchema.safeParse(user);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message).join(", ");
      toast.error(errorMessages);
      return;
    }
  
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const res_data = await response.json();
  
      if (response.ok) {
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("User Register Successful");
        navigate("/login");
      } else {
        if (res_data.message === "Email already exists") {
          toast.error("This email is already registered. Please use a different email.");
        } else {
          toast.error(res_data.extraDetails || res_data.message || "This email is already registered. Please use a different email.");
        }
      }
    } catch (error) {
      console.error("register error:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };
  

  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-red-100">
      {/* Right Side - Animation */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center hover:scale-105 transition-transform duration-300">
        <div className="w-[300px] md:w-[700px] lg:w-[800px]">
          <Lottie animationData={Sign} />
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 animate-bounce hover:text-blue-700">
          Register Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm animate-slideUp"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              required
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              required
              autoComplete="off"
              value={user.phone}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div> */}

<div className="mb-4 relative">
  <label htmlFor="password" className="block text-gray-700">
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    id="password"
    placeholder="Enter password"
    required
    autoComplete="off"
    value={user.password}
    onChange={handleInput}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
  />
 <span
  className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer text-gray-500"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300 animate-pulse"
          >
            Register Now
          </button>
        </form>

        <NavLink to="/coachF" onClick={() => window.scrollTo(0, 0)}>
          <button className="mt-4 text-blue-500 hover:underline">
            Click here to Register as a Coach
          </button>
        </NavLink>
      </div>
    </section>
  );
};
