import Abouts from "../assets/images/about1.jpg";
import Phones from "../assets/images/phone.jpg";
import Anshul from "../assets/images/Anshul.webp";
import Office from "../assets/images/office.jpg";
import { ShieldCheck, MessageCircle, Award, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";


// question and answer arry start here
const faqs = [
  {
    question: "What types of coaching can I find on HalfCoach?",
    answer:
      "HalfCoach offers coaching in a wide range of fields, including life coaching, career coaching, wellness, and personal development.",
  },
  {
    question: "How do I pay for sessions?",
    answer:
      "You can pay using various online payment methods, including credit cards and PayPal.",
  },
  {
    question: "How are the coaching sessions conducted?",
    answer:
      "Sessions are conducted via video calls, phone calls, or chat, depending on your preference.",
  },
  {
    question: "Can I buy additional resources from coaches?",
    answer:
      "Yes, many coaches offer additional resources such as e-books and personalized plans.",
  },
  {
    question: "What if I’m not satisfied with a session?",
    answer:
      "You can request a refund or switch to another coach if you're not satisfied with a session.",
  },
];
// over here question and answer



const steps = [
  {
    icon: "👥",
    title: "Browse Coaches",
    description:
      "Explore a wide range of professional coaches based on categories, specialties, and ratings.",
  },
  {
    icon: "👔",
    title: "Choose a Service",
    description:
      "Select the right coaching service that suits your personal or professional needs.",
  },
  {
    icon: "🔒",
    title: "Connect & Grow",
    description:
      "Book your session, make a secure payment via PayPal, and start working toward your goals.",
  },
];

export const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full bg-gray-100 shadow-2xl rounded-3xl flex flex-col lg:flex-row overflow-hidden"
        >
          {/* Left Side - Text Content starting here card */}
          <div className="p-12 lg:w-1/2 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-4xl font-bold text-gray-900 mb-6 leading-tight cursor-pointer"
            >
              Join the Best Marketplace for Coaches
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="italic text-gray-600 mb-6 cursor-pointer"
            >
              Unlock New Possibilities and Achieve Your Goals with HalfCoach
            </motion.p>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start cursor-pointer"
              >
                <span className="text-green-500 text-xl mr-2">✔</span>
                <span>
                  <strong className="text-gray-900">
                    Expert Coaches in Every Field:
                  </strong>{" "}
                  Find specialized coaches in wellness, career, personal
                  development, and more.
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start cursor-pointer"
              >
                <span className="text-green-500 text-xl mr-2">✔</span>
                <span>
                  <strong className="text-gray-900">Flexible Sessions:</strong>{" "}
                  Choose between quick chats or in-depth video calls at times
                  that work for you.
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start cursor-pointer"
              >
                <span className="text-green-500 text-xl mr-2">✔</span>
                <span>
                  <strong className="text-gray-900">
                    Transparent Pricing:
                  </strong>{" "}
                  Coaches set their own prices, giving you the flexibility to
                  choose based on your budget.
                </span>
              </motion.li>
            </ul>

             {/* get start upper card button start here */}
             
             
              <NavLink to="/coachF" onClick={() => window.scrollTo(0, 0)}>
                            <button className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-transform transform">
                            Get Started
                            </button>
                          </NavLink>
             
             {/* get start upper card button over here */}
          </div>
 {/* Left Side - Text Content over here card */}


          {/* Right Side - Image upper card starting here */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            className="lg:w-1/2 relative"
          >
            <img
              src={Abouts}
              alt="Coaching Session"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          {/* Right Side - Image upper card over here */}
        </motion.div>
      </div>


{/* Coaches at Your Fingertips section start here */}
      <div className="bg-gray-100 py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Coaches at Your Fingertips
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-start p-6 space-x-4 bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-green-50 transition duration-300">
              <Award className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-xl font-semibold">
                  Quality & Affordable Consultations
                </h3>
                <p className="text-gray-600">
                  Connect with experienced coaches who offer flexible pricing
                  for various services, including chat and video calls.
                </p>
              </div>
            </div>
            <div className="flex items-start p-6 space-x-4 bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-blue-50 transition duration-300">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Real-Time Support</h3>
                <p className="text-gray-600">
                  Whether you need immediate advice or a scheduled session, our
                  coaches are ready when you are.
                </p>
              </div>
            </div>
            <div className="flex items-start p-6 space-x-4 bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-red-50 transition duration-300">
              <ShieldCheck className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="text-xl font-semibold">Safe & Secure</h3>
                <p className="text-gray-600">
                  All interactions and payments are securely handled through our
                  platform, ensuring your personal and payment information is
                  protected.
                </p>
              </div>
            </div>
          </div>
          <img
            src={Phones}
            alt="Chat support on phone"
            className="rounded-xl shadow-lg w-full h-auto hover:scale-105 transition duration-300"
          />
        </div>
      </div>
      {/* Coaches at Your Fingertips section over here */}



 {/* Ceo meet the founder secion start here*/}
      <div className="flex flex-col md:flex-row items-center bg-gray-900 p-8 md:p-16 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative group ">
          <img
            src={Anshul}
            alt="Founder"
            className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:ml-10 mt-6 md:mt-0 text-center md:text-left ">
          <h2 className="text-3xl font-bold text-white transition-transform duration-300 transform hover:scale-105 hover:text-yellow-400">
            Meet the Founder
          </h2>
          <h3 className="text-xl text-yellow-400 font-semibold mt-2 cursor-pointer hover:underline hover:text-yellow-300">
            Anshul
          </h3>
          <p className="mt-4 text-white leading-relaxed transition-transform duration-300 transform hover:scale-105 hover:text-yellow-400">
            Hi, I’m Anshul, the founder of{" "}
            <span className="font-bold text-yellow-400 hover:text-yellow-300">
              HalfCoach
            </span>
            . My journey started with a simple belief:{" "}
            <span className="font-semibold text-yellow-400 hover:text-yellow-300">
              everyone deserves access to expert guidance
            </span>
            , no matter where they are or what they’re going through. Over the
            years, I’ve seen how expert advice can transform lives, but I’ve
            also realized how inaccessible and expensive it can be. That’s why I
            created HalfCoach — to bridge that gap.
          </p>
          <p className="mt-4 text-white leading-relaxed transition-transform duration-300 transform hover:scale-105 hover:text-yellow-400">
            HalfCoach was born out of a mission to{" "}
            <span className="font-semibold text-yellow-400 hover:text-yellow-300">
              democratize access to professional coaching
            </span>{" "}
            and make expert guidance available at your fingertips. Whether
            you’re seeking advice for personal growth, fitness, career
            advancement, or relationships, HalfCoach is here to connect you with
            the best minds in the world, anytime and anywhere.
          </p>
          <p className="mt-4 text-white leading-relaxed pb-15 transition-transform duration-300 transform hover:scale-105 hover:text-yellow-400">
            Our platform isn’t just about convenience — it’s about creating an
            inclusive space where people feel empowered to thrive and achieve
            their goals. With HalfCoach, you’ll always have access to the right
            advice at the right time, delivered in a way that’s affordable,
            flexible, and built around your unique needs.
          </p>

           {/*linkedin and instagram icon start here */}
          <StyledWrapper>
            <ul className="example-2">
              <li className="icon-content">
                <a
                  href="https://www.linkedin.com/in/anshul-mehra-439368215/"
                  aria-label="LinkedIn"
                  data-social="linkedin"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>

              <li className="icon-content">
                <a
                  href="https://www.instagram.com/mehraanshul10/"
                  aria-label="Instagram"
                  data-social="instagram"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">Instagram</div>
              </li>
            </ul>
          </StyledWrapper>
                     {/*linkedin and instagram icon over here */}

        </div>
      </div>
       {/* Ceo meet the founder secion over here here*/}


      <div className="p-5"></div>
       {/* find the right coach start here*/}

      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center px-10  "
        style={{ backgroundImage: `url(${Office})` }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-2xl hover:scale-105 transition-transform duration-500">
          <h1 className="text-white text-4xl font-bold mb-4">
            Find the Right Coach for You with HalfCoach
          </h1>
          <p className="text-white mb-6">
            HalfCoach goes beyond one-on-one coaching sessions. In addition to
            video calls and chat consultations, coaches offer exclusive e-books,
            presentations, and resources that can help you further your journey.
          </p>

          <NavLink to="/coaches" onClick={() => window.scrollTo(0, 0)}>
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-110 hover:bg-blue-700 hover:shadow-blue-400 hover:shadow-lg">
            Get Started
          </button>
          </NavLink>
        </div>
      </div>
             {/* find the right coach over here*/}


       {/* how it work start here*/}
      <div className="bg-gray-100 py-12 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600 italic mt-2">
            Start Your Journey in 3 Simple Steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center border hover:shadow-xl transform hover:scale-105 transition duration-300 hover:bg-blue-100 "
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
             {/* how it work end here*/}

       {/* Frequently Asked Questions start here*/}
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-center italic text-gray-600">
          Your Questions Answered
        </p>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left text-lg font-medium focus:outline-none transition-all duration-300 hover:bg-gray-200 hover:text-blue-600 hover:scale-105"
              >
                {faq.question}
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-b text-black transition-all duration-300 ease-in-out opacity-80 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
             {/* Frequently Asked Questions over here*/}

    </>
  );
};

const StyledWrapper = styled.div`
  ul {
    list-style: none;
  }

  .example-2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .example-2 .icon-content {
    margin: 0 10px;
    position: relative;
  }
  .example-2 .icon-content .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    font-size: 14px;
    transition: all 0.3s ease;
  }
  .example-2 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: -50px;
  }
  .example-2 .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #4d4d4d;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
  }
  .example-2 .icon-content a:hover {
    box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
  }
  .example-2 .icon-content a svg {
    position: relative;
    z-index: 1;
    width: 30px;
    height: 30px;
  }
  .example-2 .icon-content a:hover {
    color: white;
  }
  .example-2 .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: all 0.3s ease-in-out;
  }
  .example-2 .icon-content a:hover .filled {
    height: 100%;
  }

  .example-2 .icon-content a[data-social="linkedin"] .filled,
  .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
  }

  .example-2 .icon-content a[data-social="instagram"] .filled,
  .example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
    background: linear-gradient(
      45deg,
      #405de6,
      #5b51db,
      #b33ab4,
      #c135b4,
      #e1306c,
      #fd1f1f
    );
  }
`;



