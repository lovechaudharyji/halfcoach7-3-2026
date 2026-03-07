import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import coachregister from "../assets/images/coachr.avif";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";


// const API_URL = "http://localhost:5000/api";
const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;


export const Coachregister = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    coachType: "",
    country: "",
    password: "",
    profilePicture: null,
  });
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ On success redirect, fetch session and send stored data to backend
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");
    const sessionId = query.get("session_id");

    if (success && sessionId) {
      const storedUser = JSON.parse(localStorage.getItem("coachData"));
      const storedImage = localStorage.getItem("coachImage");

      if (!storedUser || !storedImage) return;

      const blob = dataURItoBlob(storedImage);
      const file = new File([blob], "profile.jpg", { type: blob.type });

      const formData = new FormData();
      Object.entries(storedUser).forEach(([key, val]) => {
        formData.append(key, val);
      });
      formData.append("profilePicture", file);

      setIsSubmitting(true);
      axios
        .post(`${API_URL}/coach/register`, formData)
        .then(() => {
          toast.success("Coach registered successfully!");
          localStorage.removeItem("coachData");
          localStorage.removeItem("coachImage");
          navigate("/coachlogin");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to save registration after payment.");
        })
        .finally(() => setIsSubmitting(false));
    }
  }, [location, navigate]);

  // ✅ Check if email exists before proceeding with payment
  const checkEmailExists = async (email) => {
    setIsCheckingEmail(true);
    try {
      const response = await axios.post(`${API_URL}/coach/check-email`, {
        email,
      });
      return true;
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.msg);
        return false;
      }
      toast.error("Error checking email availability");
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // ✅ Convert image to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!user.coachType) newErrors.coachType = "Coach type is required";
    if (!user.country) newErrors.country = "Country is required";
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!user.profilePicture)
      newErrors.profilePicture = "Profile picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profilePicture: "File size exceeds the 5MB limit",
        });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          profilePicture: "Only JPG, JPEG, and PNG files are allowed",
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

    try {
      setIsSubmitting(true);
      // First check if email exists
      const isEmailAvailable = await checkEmailExists(user.email);
      if (!isEmailAvailable) return;

      const base64Image = await fileToBase64(user.profilePicture);

      // ✅ Save to localStorage temporarily
      const { name, email, coachType, country, password } = user;
      localStorage.setItem(
        "coachData",
        JSON.stringify({ name, email, coachType, country, password })
      );
      localStorage.setItem("coachImage", base64Image);

      // ✅ Call backend to create Stripe session
      const { data } = await axios.post(
        `${API_URL}/payment/create-stripe-session`,
        { email }
      );

      const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong during payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Convert base64 to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gradient-to-r from-gray-900 to-blue-900">
      <div className="w-full md:w-[40%] flex flex-col items-center justify-center bg-white shadow-xl rounded-lg mx-auto py-4">
        <div className="w-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Coach Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInput}
                required
                autoComplete="name"
                placeholder="Name"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                required
                autoComplete="email"
                placeholder="Email"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="coachType"
                className="block text-sm font-medium text-gray-700"
              >
                Coach Type
              </label>
              <select
                id="coachType"
                name="coachType"
                value={user.coachType}
                onChange={handleInput}
                required
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.coachType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Coach Type
                </option>
                {["Business Coach",
  "Executive Coach","Career Coach","Leadership Coach","Performance Coach", "Public Speaking Coach","Corporate Coach","Life Coach","Mindset Coach","Confidence Coach", "Transformation Coach","Relationship Coach","Marriage Coach","Divorce Coach","Parenting Coach","Family Coach","Communication Coach","Emotional Intelligence Coach","Trauma Recovery Coach","Mental Health Coach","Stress Management Coach","Anxiety Coach","Depression Coach","Spiritual Coach","Meditation Coach","Mindfulness Coach","Law of Attraction Coach","Manifestation Coach","Holistic Health Coach","Wellness Coach","Nutrition Coach", "Weight Loss Coach", "Addiction Recovery Coach", "Financial Coach","Wealth Coach","Investment Coach","Real Estate Coach","Budgeting Coach","Focus & Concentration Coach", "Decision-Making Coach","Music Coach","Voice Coach", "Personal Branding Coach","Digital Marketing Coach","Content Creation Coach","Time Management Coach","Study Coach","Language Learning Coach", "Cross-Cultural Coach","Public Relations Coach","Hospitality Coach"].map(
                  (coach, i) => (
                    <option key={i} value={coach}>
                      {coach}
                    </option>
                  )
                )}
              </select>
              {errors.coachType && (
                <p className="mt-1 text-sm text-red-600">{errors.coachType}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={user.country}
                onChange={handleInput}
                required
                autoComplete="country"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia","Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin","Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi","Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia","Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)","Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt","El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland","France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau","Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy","Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia","Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America","Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "England"].map(
                  (c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            {/* <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div> */}
            <div className="relative">
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700"
  >
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    id="password"
    name="password"
    value={user.password}
    onChange={handleInput}
    required
    autoComplete="new-password"
    placeholder="••••••••"
    className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10 ${
      errors.password ? "border-red-500" : "border-gray-300"
    }`}
  />
  <span
    className="absolute right-3 top-[68%] transform -translate-y-1/2 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
  {errors.password && (
    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
  )}
</div>

            <div>
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.profilePicture ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profilePicture}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCheckingEmail || isSubmitting}
            >
              {isCheckingEmail ? (
                "Checking Email..."
              ) : isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Register & Pay"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          <img
            src={coachregister}
            alt="Coaching"
            className="w-full max-h-[600px] object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Start Your Coaching Journey
            </h2>
            <p className="text-lg">
              Join our platform and help others achieve their goals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
