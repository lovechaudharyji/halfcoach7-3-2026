import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutUser } from "../redux/userSlice";
import { logout as logoutCoach } from "../redux/coachSlice";
import { Link, useNavigate } from "react-router-dom";

const NavProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Access user and coach from Redux store
  const user = useSelector((state) => state.user.user);
  const coach = useSelector((state) => state.coach.coach);

  const dispatch = useDispatch();

  // Ref for the dropdown container
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutCoach());
    localStorage.removeItem("coach");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const firstLetter =
    user?.username?.charAt(0).toUpperCase() ||
    coach?.name?.charAt(0).toUpperCase();

  const profilePicture = coach?.profilePicture;
  // const baseURL = "http://localhost:5000";
  const baseURL = import.meta.env.VITE_BASE_URL;

  const imageUrl = profilePicture ? `${baseURL}${profilePicture}` : null;


const handleDashboardClick = () => {
  setIsDropdownOpen(false);

  // Navigate to the appropriate dashboard based on whether user or coach is logged in
  if (user) {
    navigate(`/userdashboard/${user.userId}`); // Navigate to user dashboard with userId
  } else if (coach) {
    navigate(`/coachdashboard/${coach.coachId}`); // Navigate to coach dashboard with coachId
  }
};


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none ring-2 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        {/* Display first letter of the username or coach's name */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold">{firstLetter}</span>
        )}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute -right-10 md:right-0 mt-2 w-fit md:w-56 bg-black border border-gray-200 rounded-lg shadow-lg z-50 transform transition-all duration-200 ease-in-out">
          <div className="p-4">
            {/* Display user or coach details */}
            {user ? (
              <>
                <div className="text-base font-semibold text-white">
                  {user.username}
                </div>
                <div className="text-sm text-gray-300">{user.email}</div>
              </>
            ) : coach ? (
              <>
                <div className="text-base font-semibold text-white">
                  {coach.name}
                </div>
                <div className="text-sm text-gray-300">{coach.email}</div>
                <div className="text-sm text-gray-300">{coach.coachType}</div>
              </>
            ) : null}
          </div>
          <hr className="border-t border-gray-200" />
          <button
            onClick={handleDashboardClick} // Navigate to the correct dashboard
            className="w-full text-left p-3 text-sm text-white hover:text-black font-bold hover:bg-gray-100 border-b transition-colors duration-200"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 text-sm text-white hover:text-black font-bold hover:bg-gray-100 rounded-b-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavProfile;