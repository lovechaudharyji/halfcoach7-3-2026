import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// const API_URL = "http://localhost:5000/api";
const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;

export const AdminRegister = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    coachType: "",
    country: "",
    password: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!user.coachType) newErrors.coachType = "Coach type is required";
    if (!user.country) newErrors.country = "Country is required";
    if (!user.password || user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!user.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profilePicture: "Max file size is 5MB" });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          profilePicture: "Only JPG, JPEG, and PNG allowed",
        });
        return;
      }

      setUser({ ...user, profilePicture: file });
      setErrors({ ...errors, profilePicture: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(user).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_URL}/coach/register`, formData);
      toast.success("Coach registered successfully!");
      navigate("/coachlogin");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gradient-to-r from-gray-900 to-blue-900">
      <div className="w-full md:w-[40%] flex flex-col items-center justify-center bg-white shadow-xl rounded-lg mx-auto py-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Coach Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 w-full px-6">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Coach Type</label>
            <select
              name="coachType"
              value={user.coachType}
              onChange={handleInput}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.coachType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Coach Type</option>
              {[
                "Business Coach",
  "Executive Coach","Career Coach","Leadership Coach","Performance Coach", "Public Speaking Coach","Corporate Coach","Life Coach","Mindset Coach","Confidence Coach", "Transformation Coach","Relationship Coach","Marriage Coach","Divorce Coach","Parenting Coach","Family Coach","Communication Coach","Emotional Intelligence Coach","Trauma Recovery Coach","Mental Health Coach","Stress Management Coach","Anxiety Coach","Depression Coach","Spiritual Coach","Meditation Coach","Mindfulness Coach","Law of Attraction Coach","Manifestation Coach","Holistic Health Coach","Wellness Coach","Nutrition Coach", "Weight Loss Coach", "Addiction Recovery Coach", "Financial Coach","Wealth Coach","Investment Coach","Real Estate Coach","Budgeting Coach","Focus & Concentration Coach", "Decision-Making Coach","Music Coach","Voice Coach", "Personal Branding Coach","Digital Marketing Coach","Content Creation Coach","Time Management Coach","Study Coach","Language Learning Coach", "Cross-Cultural Coach","Public Relations Coach","Hospitality Coach"
              ].map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.coachType && (
              <p className="text-red-600 text-sm mt-1">{errors.coachType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleInput}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter country"
            />
            {errors.country && (
              <p className="text-red-600 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.profilePicture && (
              <p className="text-red-600 text-sm mt-1">
                {errors.profilePicture}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

     
    </section>
  );
};
