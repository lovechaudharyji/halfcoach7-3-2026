
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export const Footers = () => {
 

  const socialLinks = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com/people/HalfCoachcom/61565403483917/?mibextid=wwXIfr&rdid=upfvfuu7JYpgOLaz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1NpZwVLmwq%2F%3Fmibextid%3DwwXIfr" },
    { icon: <FaTwitter />, link: "https://x.com/halfcoachHQ" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/half_coach/" },
    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/company/halfcoach/" },
  ];

  return (
    <footer className="bg-black text-white py-10 px-5 rounded-t-3xl shadow-xl">
      {/* Top Links */}
      <div className="flex justify-center gap-6 border-b border-gray-700 pb-5">
        <NavLink
          to="/terms"
          className="text-gray-500 hover:text-blue-400 transition-all"
          onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
        >
          Terms of Service
        </NavLink>


        <NavLink
          to="/privacy"
          className="text-gray-500 hover:text-blue-400 transition-all"
          onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
        >
          Privacy Policy
        </NavLink>

        
        
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
        {/* About Section */}
        

        {/* Apps */}
        <div>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-400 transition-all">
            Apps
          </h3>
          <p className="text-gray-400">iOS App (Coming Soon)</p>
          <p className="text-gray-400">Android App (Coming Soon)</p>
        </div>

        

        {/* Social & Contact */}
        <div>
      <h3 className="text-xl font-bold mb-3 hover:text-blue-400 transition-all">
        Follow Us
      </h3>
      <div className="flex gap-3">
        {socialLinks.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="bg-blue-500 p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-all text-white text-lg"
          >
            {item.icon}
          </motion.a>
        ))}
      </div>

      
    </div>
    <div>
          <p className=" font-bold">Let HalfCoach Be the Better Half of Your Growth.</p>
        </div>
      </div>

      {/* Head Office Section */}
      <div className="mt-10 text-center text-gray-400">
        <h3 className="text-xl font-bold mb-3 hover:text-blue-400 transition-all">
          Head Office
        </h3>
        <p>
          3 Fitzroy Place, 1/1, Sauchiehall Street, Glasgow Central, G3 7RH UK
        </p>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-5">
        <p className="text-gray-500">© HalfCoach. 2024. All rights reserved.</p>
        
      </div>
    </footer>
  );
};
