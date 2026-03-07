import Lottie from "lottie-react";
import { motion } from "framer-motion";
import AI from "../assets/Ai.json";
import Background from "../assets/Homebg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import Clander from "../assets/images/clander.png";
import Coaching from "../assets/images/Coaching.jpg";
import World from "../assets/images/world.jpg";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Categories from "../components/categories";
import { loadStripe } from '@stripe/stripe-js';

import { useLocation, useNavigate } from 'react-router-dom';



const services = [
  {
    title: "Worldwide Experts",
    description:
      "Connect with top coaches from around the globe, all in one place.",
    image: World,
  },
  {
    title: "Flexible Scheduling",
    description: "Easily schedule sessions that fit your busy lifestyle.",
    image: Clander,
  },
  {
    title: "Personalised Coaching",
    description:
      "Get tailored coaching that fits your personal or professional needs.",
    image: Coaching,
  },
];


export const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [featcoaches, setFeatCoaches] = useState([]);


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:5000/api/coach/coaches"
        // );
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/coach/coaches`
        );
        setCoaches(response.data);        
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };
    const fetchFeatCoaches = async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:5000/api/coach/featured"
        // );
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/coach/featured`
        );
        setFeatCoaches(response.data);        
      } catch (error) {
       // console.error("Error fetching coaches:", error);
      }
    };

    fetchCoaches();
    fetchFeatCoaches();
  }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
  const location = useLocation();

  // const stripePromise = loadStripe('pk_test_51R8pnXP1dQNcnYxHtOq7Kx3KjU6XTJUq3Ep2Br9bOuS1Ixi55ZfIK7BKgYsBIbvWsjkQ1D6b8f0DfmGKELExTWNC00mNukAF06');
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


  const donationAmounts = [2, 5, 10, 25, 50, 100, 500, 1000, 2500, 5000, 7500, 10000];

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      alert('✅ Payment Done');
      navigate('/');
    } else if (query.get('canceled')) {
      alert('❌ Payment Not Done');
      navigate('/');
    }
  }, [location, navigate]);

  const handleDonate = async (amount) => {
    try {
      const stripe = await stripePromise;
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-donation-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();

      if (!response.ok) {
         throw new Error(session.error || "Failed to create donation session");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert(error.message || "Something went wrong with the donation. Please try again.");
    }
  };

  return (
    <div>
      {/* background image*/}
      <div
        className="h-150 bg-cover bg-center flex flex-wrap items-center justify-center px-5 rounded-b-4xl py-10 md:py-20 w-full"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* Left Side - Text Section start here */}
        <div className="w-full md:w-1/2 p-6 md:p-9 text-center md:text-left rounded-lg shadow-lg">
          <h1 className="text-amber-50 text-3xl md:text-5xl font-semibold">
          Let HalfCoach Be the Better Half of Your Growth.
          </h1>
          <p className="text-amber-50 mt-2 text-lg md:text-2xl mb-14">
            Browse a curated list of expert coaches and start your journey
            today.
          </p>
        </div>
        {/* Left Side - Text Section over*/}

        {/* Right Side - Lottie Animation  start here*/}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <div className="w-[300px] h-[200px] md:w-[500px] md:h-[300px] lg:w-[700px] lg:h-[400px]">
            <Lottie animationData={AI} />
          </div>
        </div>
      </div>
      {/* Right Side - Lottie Animation  over here*/}

      {/*  feature Coaches Section start here*/}
      <div className="w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold pb-6 sm:pb-11">
            Featured Coaches
          </h2>
          <NavLink to="/coaches" onClick={() => window.scrollTo(0, 0)}>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              See All Coaches
            </button>
          </NavLink>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          speed={800}
          navigation
          className="flex"
        >
          {featcoaches.map((coach) => (
            <SwiperSlide key={coach._id} className="w-[180px]">
              <StyledWrapper>
                <div className="book mx-auto">
                  <button className="mt-3 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
                    <Link to={`/coach/${coach._id}`}>Connect Now</Link>
                  </button>
                  <div className="cover relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}
                      alt={coach.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center p-2">
                      <h3 className="font-bold text-lg">{coach.name}</h3>
                      <p className="text-sm">{coach.coachType}</p>
                      <p className="text-xs mt-1">
                        Languages: {coach.languages.join(", ")}
                      </p>
                      <p className="text-xs">From: {coach.country}</p>
                      <p className="text-xs">
                        Hourly Rate: £{coach.hourlyRate}
                      </p>
                    </div>
                  </div>
                </div>
              </StyledWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/*  starting earning with half coach start here*/}
      <div className="pt-5 px-4 sm:px-6 lg:px-8">
        <p className="bg-black text-white text-2xl sm:text-3xl text-center p-2 rounded-3xl hover:bg-blue-700 transition">
          Start earning with HalfCoach by offering your expertise to users.
        </p>
        <div className="flex flex-col lg:flex-row h-auto lg:h-100 bg-cover bg-center items-center justify-center px-5 bg-white mt-5 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2 p-6 sm:p-9 bg-black rounded-b-3xl shadow-lg text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Register As Coach
            </h1>
            <p className="mt-2 text-white pb-2">
              Are you a professional or experienced in your field? Start earning
              with HalfCoach by offering your expertise to users. Register today
              for free and connect with clients looking for personalized
              guidance, all from the comfort of your home.
            </p>
            <NavLink to="/coachF" onClick={() => window.scrollTo(0, 0)}>
              <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg text-lg transition-transform transform hover:scale-110">
                Register Now
              </button>
            </NavLink>
            ;
          </div>
          <div className="w-full lg:w-1/2 text-lg sm:text-xl pb-6 lg:pb-10 pl-0 lg:pl-12 text-center lg:text-left">
            <div className="font-bold space-y-2">
              <p>✅ The best for every budget</p>
              <p>✅ Quality work done quickly</p>
              <p>✅ Protected payments, every time</p>
              <p>✅ 24/7 support</p>
            </div>
          </div>
        </div>
      </div>
      {/*  starting earning with half coach over here*/}
      <Categories />
      {/*  recently coach joining start here*/}
      <div className="bg-gray-800 p-6 sm:p-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl text-white font-bold">
              Recently Joined Coaches
            </h2>
            <NavLink to="/coaches" onClick={() => window.scrollTo(0, 0)}>
              <button className="text-white hover:text-blue-300 mt-2 sm:mt-0">
                View More →
              </button>
            </NavLink>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 hover:bg-gray-600"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}
                  alt={coach.name}
                  className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center">
                  <h3 className="text-white font-semibold transition-colors duration-300 hover:text-yellow-300">
                    {coach.name}
                  </h3>
                  <p className="text-gray-300 text-sm transition-colors duration-300 hover:text-yellow-200">
                    {coach.title}
                  </p>
                </div>
              </div>
            ))}
          </div> */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  {coaches.slice(0, 6).map((coach, index) => (
    <div
      key={index}
      className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 hover:bg-gray-600"
    >
      <img
        src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}
        alt={coach.name}
        className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center">
        <h3 className="text-white font-semibold transition-colors duration-300 hover:text-yellow-300">
          {coach.name}
        </h3>
        <p className="text-gray-300 text-sm transition-colors duration-300 hover:text-yellow-200">
          {coach.title}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
      {/*  recently coach joining over here*/}

      <div className="pt-3"></div>

      {/* <div className="bg-gray-900 p-14 rounded-2xl text-white text-center max-w-7xl mx-auto shadow-2xl">
  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Support HalfCoach 🎯</h2>
  <p className="mb-10 text-gray-300 text-lg">Your contribution helps us empower lives through expert coaching.</p>

  <div className="flex flex-wrap gap-6 justify-center">
    {donationAmounts.map((amount, index) => (
      <button
        key={index}
        onClick={() => handleClick(amount)}
        className={`px-8 py-4 rounded-2xl font-bold text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
          amount <= 500
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-yellow-400 text-black hover:bg-yellow-300'
        }`}
      >
        £{amount.toLocaleString()}
      </button>
    ))}
  </div>
</div> */}
<div className="bg-[#0f172a] text-white p-10 rounded-2xl max-w-7xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">Support HalfCoach 🎯</h1>
      <p className="mb-6 text-gray-300">Your contribution helps us empower lives through expert coaching.</p>
      <div className="flex flex-wrap justify-center gap-4">
        {donationAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonate(amount)}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition 
              ${amount <= 500 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
          >
            £{amount.toLocaleString()}
          </button>
        ))}
      </div>
    </div>

      {/*  starting earing with half coach start here*/}
      <div className="flex flex-col items-center bg-gray-100 py-12 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform">
          Start Earning with HalfCoach
        </h1>
        <p className="text-gray-700 text-center max-w-2xl mb-8 hover:text-green-500 transition-colors duration-300 hover:scale-105 transform">
          Join HalfCoach as a coach or expert in your field. Earn money by
          providing consultation through chat or video calls to users who need
          your expertise. Set your rates and start helping others while getting
          paid for it!
        </p>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-blue-100 hover:rotate-2">
            <div className="bg-blue-500 text-white p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m0 0V9m0 5l-4.553 2.276A2 2 0 018 14.382V9.618a2 2 0 012.447-1.894L15 10z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">
              Video Call Consulting
            </h2>
            <p className="text-gray-600 mt-2 hover:text-gray-900 transition-colors duration-300">
              Provide personalized, face-to-face coaching through our secure
              video call platform. Set your rates and help clients worldwide in
              real-time.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-green-100 hover:-rotate-2">
            <div className="bg-green-500 text-white p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a4 4 0 00-8 0v2M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2-2 0 012-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 hover:text-green-500 transition-colors duration-300">
              Get Paid Securely
            </h2>
            <p className="text-gray-600 mt-2 hover:text-gray-900 transition-colors duration-300">
              Receive payments directly through our platform. Our secure payment
              system ensures you get paid promptly for every session completed.
            </p>
          </div>
        </div>

        <NavLink to="/coachF" onClick={() => window.scrollTo(0, 0)}>
          <button className="mt-8 bg-black text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-gray-800 transform transition-transform duration-300 hover:scale-110 hover:rotate-1">
            Join HalfCoach Today
          </button>
        </NavLink>
      </div>
      {/*  starting earing with half coach over here*/}

      <div className="flex items-center justify-center min-h-auto bg-gradient-to-b from-green-100 to-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 text-center w-full max-w-5xl hover:shadow-3xl transition-shadow duration-300"

      >
        <div className="flex justify-center mb-6 text-5xl animate-bounce">
  <span role="img" aria-label="earth">
    🌍
  </span>
</div>
        <h2 className="text-5xl md:text-4xl font-bold text-green-800 mb-4">
          Flourish with HalfCoach, Nurture the Earth{' '}
          <span role="img" aria-label="plant">
            🌱✨
          </span>
        </h2>

        <p className="text-green-700 text-lg md:text-xl mb-4">
          Elevate your life while giving back to the planet. With every coaching session you book on{' '}
          <span className="font-semibold text-green-900 hover:underline transition duration-200 cursor-pointer">
            HalfCoach
          </span>
          , a tree is planted—fostering both your personal growth and a greener future.{' '}
          <span role="img" aria-label="earth and heart">
            🌍💚
          </span>
        </p>

        <p className="text-green-700 text-base md:text-lg">
          Invest in yourself, embrace your journey, and let each step forward leave a beautiful, lasting impact.
          One session, one tree, one brighter future at a time.{' '}
          <span role="img" aria-label="leaves and sparkles">
            🌿✨
          </span>
        </p>
      </motion.div>
    </div>

      {/*  half coach services start here*/}
      <div className="bg-gray-900 text-white py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 hover:text-yellow-300 transition duration-300">
          HalfCoach Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8 container mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-gray-800 p-6 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ rotate: 2, scale: 1.1 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4 hover:text-yellow-400 transition duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-300 hover:text-yellow-300 transition duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold hover:text-yellow-400 transition duration-300">
            Why Choose HalfCoach?
          </h3>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto hover:text-yellow-200 transition duration-300">
            At HalfCoach, we offer a seamless connection to expert coaches
            across a wide range of fields, helping you unlock your potential
            with personalized support. Whether you’re seeking guidance from a{" "}
            <span className="font-bold text-white">fitness coach</span> to reach
            your health and wellness goals, a{" "}
            <span className="font-bold text-white">life coach</span> to navigate
            personal challenges, or a{" "}
            <span className="font-bold text-white">career coach</span> to
            accelerate your professional growth, or a relationship coach to
            improve your personal life, HalfCoach has you covered. We also offer
            access to financial coaches, business mentors, spiritual coaches,
            <span className="font-bold text-white">wellness coaches</span> and
            more, ensuring that no matter your focus, you’ll find the perfect
            expert to guide you. With easy access to real-time video calls and
            chat sessions, secure payments, and a community of trusted
            professionals, HalfCoach is the go-to platform for anyone looking to
            elevate their life with personalized coaching.
          </p>
        </div>
      </div>
      {/*  half coach services over here*/}

      {/*  we value your feedback start here*/}
      <motion.div
        className="relative flex flex-col items-center justify-center p-8 bg-gray-900 text-white rounded-b-4xl shadow-2xl border border-gray-800 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-2xl animate-pulse"></div>
        <h2 className="text-3xl font-bold mb-4 relative z-10">
          We Value Your Feedback
        </h2>
        <p className="text-gray-300 text-center relative z-10">
          Your thoughts and ideas help us improve HalfCoach and create a better
          platform for everyone. If you have suggestions or feedback, please
          dont hesitate to reach out to us.
        </p>
        <motion.a
          href="mailto:contact@halfcoach.com"
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md relative z-10 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          contact@halfcoach.com
        </motion.a>
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-black opacity-10 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      {/*  we value your feedback over here*/}
    </div>
  );
};

const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 50px;
    width: 280px;
    height: 300px;
    background-color: whitesmoke;
    box-shadow: 1px 1px 12px #000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
  }

  .cover {
    position: absolute;
    background-color: lightgray;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.5s;
    transform-origin: 0;
    box-shadow: 1px 1px 12px #000;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .book:hover .cover {
    transform: rotateY(-80deg);
  }
`;
