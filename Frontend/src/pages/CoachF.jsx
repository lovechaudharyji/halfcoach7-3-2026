import { motion } from "framer-motion";
import Coachbg from "../assets/images/coachF.jpg";
import { NavLink } from "react-router-dom";

export const CoachF = () => {
    return (
        <>
         {/* background image start here */}
        <div
          className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-5 rounded-b-4xl py-10 md:py-20 w-full"
          style={{ backgroundImage: `url(${Coachbg})` }}
        >
          {/* Animated Card */}
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-indigo-500 text-white rounded-4xl shadow-2xl p-6 sm:p-10 md:p-12 max-w-4xl w-full text-center transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.08, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
          >
            {/* Animated Heading */}
            <motion.h2
              className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🎉 Exclusive One-Time Offer for Early Coaches!
            </motion.h2>
      
            <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">
              We’re currently in our early stages, and as a valued coach registering today, 
              you can secure your spot for just 
              <span className="text-red-600 font-extrabold text-lg sm:text-xl"> £49.99</span>!
            </p>
            <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">
              Once our platform fully launches, <strong>new coaches will have to pay a monthly subscription fee.</strong> 
              But since youre joining us early, <strong>you’ll never be asked to pay for a subscription, your access will remain free for life!</strong>
            </p>
            <p className="text-white text-base sm:text-lg mb-6 sm:mb-8">
              Dont miss this limited-time opportunity to be listed on HalfCoach at a one-time registration fee.
            </p>
      
            {/* Animated Button  register now button start here*/}
            <NavLink to="/coachregister" onClick={() => window.scrollTo(0, 0)}>
            <motion.button
              className="bg-black text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg font-bold shadow-lg transition-all duration-300 hover:bg-gray-900"
              whileHover={{ scale: 1.12, boxShadow: "0px 8px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              Register Now for £49.99
            </motion.button>
            </NavLink>
          </motion.div>
        </div>
        {/* Animated Button register over here */}
        
          
       
      
      {/* special coach offer start here with linkedin link */}
      
        <div className="w-full py-8 sm:py-10 px-4 sm:px-6 bg-gradient-to-r from-gray-900 to-indigo-500 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold flex justify-center items-center gap-2">
            🎉 Special Offer for Coaches!
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg max-w-2xl mx-auto">
            We have exclusive offers for new coaches! Drop us a message on LinkedIn, and we’ll send you a coupon code for registration.
          </p>
      
          <div className="mt-4 sm:mt-5">
            <a 
              href="https://www.linkedin.com/in/anshul-mehra-439368215/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-700 px-4 sm:px-5 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:bg-blue-100 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 mr-2">
                <path d="M20.447 20.452h-3.554v-5.548c0-1.323-.027-3.025-1.843-3.025-1.843 0-2.124 1.438-2.124 2.924v5.649h-3.556v-11.4h3.415v1.556h.048c.476-.9 1.635-1.846 3.368-1.846 3.601 0 4.266 2.37 4.266 5.459v6.231zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.07s.926-2.069 2.069-2.069 2.069.926 2.069 2.069c0 1.143-.926 2.07-2.069 2.07zm1.781 13.019h-3.563v-11.4h3.563v11.4zM22.225 0h-20.451c-.977 0-1.771.793-1.771 1.77v20.459c0 .978.794 1.771 1.771 1.771h20.451c.978 0 1.771-.793 1.771-1.771v-20.459c0-.977-.793-1.77-1.771-1.77z"/>
              </svg>
              Message Us on LinkedIn
            </a>
          </div>
        </div>
         {/* special coach offer end here with linkedin link */}
      </>
      
    );
};