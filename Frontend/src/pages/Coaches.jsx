// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FiSearch,
//   FiChevronDown,
//   FiChevronUp,
//   FiAward,
//   FiCalendar,
//   FiClock,
//   FiShuffle,
//   FiMapPin,
//   FiUser,
//   FiGlobe,
// } from "react-icons/fi";
// import { IoIosPricetags } from "react-icons/io";
// import { useSelector } from "react-redux";

// export const Coaches = () => {
//   const location = useLocation();
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [coaches, setCoaches] = useState([]);
//   const [sortedData, setSortedData] = useState([]);
//   const [sortCriterion, setSortCriterion] = useState("experience");
//   const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false);
//   const [isCountryDropdownVisible, setIsCountryDropdownVisible] =
//     useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//    const [limit] = useState(12);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Create refs for dropdowns
//   const sortDropdownRef = useRef(null);
//   const countryDropdownRef = useRef(null);
//   const sortButtonRef = useRef(null);
//   const countryButtonRef = useRef(null);

//   const user = useSelector((state) => state.user.user);

//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, []);

//   useEffect(() => {
//     if (!user) {
//       let toastCount = 0;
//       const interval = setInterval(() => {
//         if (toastCount < 5) {
//           toast.info("Please login to schedule a session with a coach.");
//           toastCount++;
//         } else {
//           clearInterval(interval); // Stop after 5 messages
//         }
//       }, 2000); // Show every 5 seconds

//       return () => clearInterval(interval); // Clean up interval on component unmount
//     }
//   }, [user]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const category = searchParams.get("category");
//     if (category) {
//       setSelectedCategory(category);
//       setSearchTerm(category); // Set the search term to filter coaches
//     }
//   }, [location.search]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close sort dropdown if clicked outside
//       if (
//         isSortDropdownVisible &&
//         sortDropdownRef.current &&
//         !sortDropdownRef.current.contains(event.target) &&
//         sortButtonRef.current &&
//         !sortButtonRef.current.contains(event.target)
//       ) {
//         setIsSortDropdownVisible(false);
//       }

//       // Close country dropdown if clicked outside
//       if (
//         isCountryDropdownVisible &&
//         countryDropdownRef.current &&
//         !countryDropdownRef.current.contains(event.target) &&
//         countryButtonRef.current &&
//         !countryButtonRef.current.contains(event.target)
//       ) {
//         setIsCountryDropdownVisible(false);
//       }
//     };

//     // Add event listener when dropdowns are visible
//     if (isSortDropdownVisible || isCountryDropdownVisible) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSortDropdownVisible, isCountryDropdownVisible]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         // const coachesResponse = await axios.get(
//         //   `http://localhost:5000/api/coach/coach?page=${currentPage}&limit=${limit}`
//         // );
//         const coachesResponse = await axios.get(
//           `${
//             import.meta.env.VITE_BASE_URL
//           }/api/coach/coach?page=${currentPage}&limit=${limit}`
//         );
//         setCoaches(coachesResponse.data.coaches);
//         setTotalPages(coachesResponse.data.totalPages);
//         setSortedData(coachesResponse.data.coaches);

//         // const countriesResponse = await axios.get(
//         //   "http://localhost:5000/api/coach/countries"
//         // );
//         const countriesResponse = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/coach/countries`
//         );
//         setCountries(countriesResponse.data);
//       } catch (error) {
//         console.log("Error in Fetching the Coaches Details", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentPage, limit]);

//   const sortCoaches = (criterion) => {
//     let sorted;
//     switch (criterion) {
//       case "experience":
//         sorted = [...coaches].sort((a, b) => b.experience - a.experience);
//         break;
//       case "newest":
//         sorted = [...coaches].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         break;
//       case "oldest":
//         sorted = [...coaches].sort(
//           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//         );
//         break;
//       case "random":
//         sorted = [...coaches].sort(() => Math.random() - 0.5);
//         break;
//       default:
//         sorted = [...coaches].sort((a, b) => b.experience - a.experience);
//     }
//     setSortedData(sorted);
//     setSortCriterion(criterion);
//     setIsSortDropdownVisible(false);
//   };

//   const filteredCoaches = sortedData.filter((coach) => {
//     const matchesSearchTerm = coach.coachType
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCountry =
//       selectedCountry === "" || coach.country === selectedCountry;
//     const matchesCategory =
//       selectedCategory === "" ||
//       coach.coachType.toLowerCase().includes(selectedCategory.toLowerCase());

//     return matchesSearchTerm && matchesCountry && matchesCategory;
//   });

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const getSortCriterionLabel = (criterion) => {
//     const labels = {
//       experience: "Experience",
//       newest: "Newest",
//       oldest: "Oldest",
//       random: "Random",
//     };
//     return labels[criterion] || criterion;
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-4">
//       <ToastContainer />
//       <div className="text-center mb-6">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">
//           Our Expert Coaches
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Find the perfect coach to guide you on your fitness journey
//         </p>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="flex flex-col md:flex-row justify-around items-center mb-8 gap-4">
//         {/* Search Bar */}
//         <div className="relative w-full md:w-[50%]">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FiSearch className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-3xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Search by specialty (e.g. Yoga, PT, Nutrition)..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setSelectedCategory("");
//             }}
//           />
//         </div>

//         {/* Filter and Sort Controls */}
//         <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//           {/* Country Filter Dropdown */}
//           <div className="relative">
//             <button
//               ref={countryButtonRef}
//               onClick={() => {
//                 setIsCountryDropdownVisible(!isCountryDropdownVisible);
//                 // Close sort dropdown if open
//                 if (isSortDropdownVisible) setIsSortDropdownVisible(false);
//               }}
//               className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
//             >
//               <div className="flex items-center">
//                 <FiGlobe className="text-gray-500 mr-2" />
//                 <span className="text-gray-700 truncate">
//                   {selectedCountry || "All Countries"}
//                 </span>
//               </div>
//               {isCountryDropdownVisible ? (
//                 <FiChevronUp className="ml-2 text-gray-500" />
//               ) : (
//                 <FiChevronDown className="ml-2 text-gray-500" />
//               )}
//             </button>

//             {isCountryDropdownVisible && (
//               <div
//                 ref={countryDropdownRef}
//                 className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 max-h-60 overflow-y-auto"
//               >
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setSelectedCountry("");
//                       setIsCountryDropdownVisible(false);
//                     }}
//                     className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                       selectedCountry === ""
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     All Countries
//                   </button>
//                   {countries.map((country, index) => (
//                     <button
//                       key={index}
//                       onClick={() => {
//                         setSelectedCountry(country);
//                         setIsCountryDropdownVisible(false);
//                       }}
//                       className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                         selectedCountry === country
//                           ? "bg-blue-100 text-blue-700"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       {country}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sort Dropdown */}
//           <div className="relative">
//             <button
//               ref={sortButtonRef}
//               onClick={() => {
//                 setIsSortDropdownVisible(!isSortDropdownVisible);
//                 // Close country dropdown if open
//                 if (isCountryDropdownVisible)
//                   setIsCountryDropdownVisible(false);
//               }}
//               className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
//             >
//               <div className="flex items-center">
//                 <FiAward className="text-gray-500 mr-2" />
//                 <span className="text-gray-700">
//                   {getSortCriterionLabel(sortCriterion)}
//                 </span>
//               </div>
//               {isSortDropdownVisible ? (
//                 <FiChevronUp className="ml-2 text-gray-500" />
//               ) : (
//                 <FiChevronDown className="ml-2 text-gray-500" />
//               )}
//             </button>

//             {isSortDropdownVisible && (
//               <div
//                 ref={sortDropdownRef}
//                 className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//               >
//                 <div className="py-1">
//                   <button
//                     onClick={() => sortCoaches("experience")}
//                     className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                       sortCriterion === "experience"
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <FiAward className="mr-2" />
//                     Experience
//                   </button>
//                   <button
//                     onClick={() => sortCoaches("newest")}
//                     className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                       sortCriterion === "newest"
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <FiCalendar className="mr-2" />
//                     Newest
//                   </button>
//                   <button
//                     onClick={() => sortCoaches("oldest")}
//                     className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                       sortCriterion === "oldest"
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <FiClock className="mr-2" />
//                     Oldest
//                   </button>
//                   <button
//                     onClick={() => sortCoaches("random")}
//                     className={`flex items-center px-4 py-2 text-sm w-full text-left ${
//                       sortCriterion === "random"
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <FiShuffle className="mr-2" />
//                     Random
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Coaches Grid */}
//       {!isLoading && (
//         <>
//           {filteredCoaches.length === 0 ? (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-medium text-gray-700">
//                 No coaches found
//               </h3>
//               <p className="text-gray-500 mt-2">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredCoaches.map((coach) => (
//                 <div
//                   key={coach._id}
//                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div className="flex justify-center pt-6">
//                     <div className="relative">
//                       <img
//                         className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
//                         src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}
//                         alt={coach.name}
//                         onError={(e) => {
//                           e.target.onerror = null;
//                         }}
//                       />
//                       <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
//                         <FiUser className="text-white" />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="text-center">
//                       <h2 className="text-xl font-bold text-gray-800 mb-1">
//                         {coach.name}
//                       </h2>
//                       <p className="text-blue-600 font-semibold mb-3">
//                         {coach.coachType}
//                       </p>
//                     </div>
//                     <div className="space-y-2 text-gray-600">
//                       <div className="flex items-center">
//                         <FiAward className="text-blue-500 mr-2" />
//                         <span>
//                           <span className="font-medium">Experience:</span>{" "}
//                           {coach.experience || "N/A"} years
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <FiMapPin className="text-blue-500 mr-2" />
//                         <span>
//                           <span className="font-medium">Country:</span>{" "}
//                           {coach.country || "Not specified"}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <FiMapPin className="text-blue-500 mr-2" />
//                         <span>
//                           <span className="font-medium">Languages:</span>{" "}
//                           {coach.languages?.join(", ") || "Not specified"}
//                         </span>
//                       </div>
//                       {/* Add service price information */}
//                       {coach.services?.length > 0 && (
//                         <div className="flex items-center">
//                           <IoIosPricetags className="text-blue-500 mr-2" />
//                           <span>
//                             <span className="font-medium">Price:</span> £
//                             {coach.services[0].price || "Not specified"}
//                             <span className="text-sm text-gray-500 ml-1">
//                               ({coach.services[0].duration})
//                             </span>
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 text-center">
//                       <Link
//                         to={`/coach/${coach._id}`}
//                         className="inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300"
//                       >
//                         View Profile
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//       {/* ⬅️➡️ Pagination */}
//     <div className="flex justify-center mt-6 gap-2">
//       <button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 border rounded"
//       >
//         Prev
//       </button>
//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index}
//           onClick={() => handlePageChange(index + 1)}
//           className={`px-3 py-1 border rounded ${
//             currentPage === index + 1 ? "bg-blue-500 text-white" : ""
//           }`}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 border rounded"
//       >
//         Next
//       </button>
//     </div>
//     </div>
//   );
// };
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiAward,
  FiCalendar,
  FiClock,
  FiShuffle,
  FiMapPin,
  FiUser,
  FiGlobe,
} from "react-icons/fi";
import { IoIosPricetags } from "react-icons/io";
import { useSelector } from "react-redux";

export const Coaches = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCoaches, setAllCoaches] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [displayedCoaches, setDisplayedCoaches] = useState([]);
  const [sortCriterion, setSortCriterion] = useState("experience");
  const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false);
  const [isCountryDropdownVisible, setIsCountryDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState(""); // New state for name search
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Create refs for dropdowns
  const sortDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const sortButtonRef = useRef(null);
  const countryButtonRef = useRef(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) {
      let toastCount = 0;
      const interval = setInterval(() => {
        if (toastCount < 5) {
          toast.info("Please login to schedule a session with a coach.");
          toastCount++;
        } else {
          clearInterval(interval);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
      setSearchTerm(category);
      setIsFilterActive(true);
    }
  }, [location.search]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSortDropdownVisible &&
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setIsSortDropdownVisible(false);
      }

      if (
        isCountryDropdownVisible &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(event.target)
      ) {
        setIsCountryDropdownVisible(false);
      }
    };

    if (isSortDropdownVisible || isCountryDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortDropdownVisible, isCountryDropdownVisible]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const coachesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/coach/coach?page=1&limit=1000`
        );
        setAllCoaches(coachesResponse.data.coaches);
        setSortedData(coachesResponse.data.coaches);

        const countriesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/coach/countries`
        );
        setCountries(countriesResponse.data);
      } catch (error) {
        console.log("Error in Fetching the Coaches Details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply filtering and pagination
  useEffect(() => {
    const filtered = sortedData.filter((coach) => {
      const matchesSearchTerm = coach.coachType
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesName = coach.name
        .toLowerCase()
        .includes(nameSearchTerm.toLowerCase()); // New name filter
      const matchesCountry =
        selectedCountry === "" || coach.country === selectedCountry;
      const matchesCategory =
        selectedCategory === "" ||
        coach.coachType.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearchTerm && matchesName && matchesCountry && matchesCategory;
    });

    const filteringActive = searchTerm || nameSearchTerm || selectedCountry || selectedCategory;
    setIsFilterActive(filteringActive);

    if (filteringActive) {
      if (filtered.length <= limit) {
        setDisplayedCoaches(filtered);
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        const totalPages = Math.ceil(filtered.length / limit);
        setTotalPages(totalPages);
        
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        setDisplayedCoaches(filtered.slice(startIndex, endIndex));
      }
    } else {
      const totalPages = Math.ceil(sortedData.length / limit);
      setTotalPages(totalPages);
      
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      setDisplayedCoaches(sortedData.slice(startIndex, endIndex));
    }
  }, [sortedData, searchTerm, nameSearchTerm, selectedCountry, selectedCategory, currentPage, limit]);

  const sortCoaches = (criterion) => {
    let sorted;
    switch (criterion) {
      case "experience":
        sorted = [...allCoaches].sort((a, b) => b.experience - a.experience);
        break;
      case "newest":
        sorted = [...allCoaches].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest":
        sorted = [...allCoaches].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "random":
        sorted = [...allCoaches].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = [...allCoaches].sort((a, b) => b.experience - a.experience);
    }
    setSortedData(sorted);
    setSortCriterion(criterion);
    setIsSortDropdownVisible(false);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getSortCriterionLabel = (criterion) => {
    const labels = {
      experience: "Experience",
      newest: "Newest",
      oldest: "Oldest",
      random: "Random",
    };
    return labels[criterion] || criterion;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4">
      <ToastContainer />
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Our Expert Coaches
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect coach to guide you on your fitness journey
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Bars - Wrapped in a container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-[60%]">
          {/* Specialty Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-3xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by specialty..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCategory("");
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Name Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-3xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by name..."
              value={nameSearchTerm}
              onChange={(e) => {
                setNameSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Country Filter Dropdown */}
          <div className="relative">
            <button
              ref={countryButtonRef}
              onClick={() => {
                setIsCountryDropdownVisible(!isCountryDropdownVisible);
                if (isSortDropdownVisible) setIsSortDropdownVisible(false);
              }}
              className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
            >
              <div className="flex items-center">
                <FiGlobe className="text-gray-500 mr-2" />
                <span className="text-gray-700 truncate">
                  {selectedCountry || "All Countries"}
                </span>
              </div>
              {isCountryDropdownVisible ? (
                <FiChevronUp className="ml-2 text-gray-500" />
              ) : (
                <FiChevronDown className="ml-2 text-gray-500" />
              )}
            </button>

            {isCountryDropdownVisible && (
              <div
                ref={countryDropdownRef}
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 max-h-60 overflow-y-auto"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedCountry("");
                      setIsCountryDropdownVisible(false);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      selectedCountry === ""
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Countries
                  </button>
                  {countries.map((country, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryDropdownVisible(false);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                        selectedCountry === country
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              ref={sortButtonRef}
              onClick={() => {
                setIsSortDropdownVisible(!isSortDropdownVisible);
                if (isCountryDropdownVisible) setIsCountryDropdownVisible(false);
              }}
              className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
            >
              <div className="flex items-center">
                <FiAward className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {getSortCriterionLabel(sortCriterion)}
                </span>
              </div>
              {isSortDropdownVisible ? (
                <FiChevronUp className="ml-2 text-gray-500" />
              ) : (
                <FiChevronDown className="ml-2 text-gray-500" />
              )}
            </button>

            {isSortDropdownVisible && (
              <div
                ref={sortDropdownRef}
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div className="py-1">
                  <button
                    onClick={() => sortCoaches("experience")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      sortCriterion === "experience"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiAward className="mr-2" />
                    Experience
                  </button>
                  <button
                    onClick={() => sortCoaches("newest")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      sortCriterion === "newest"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiCalendar className="mr-2" />
                    Newest
                  </button>
                  <button
                    onClick={() => sortCoaches("oldest")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      sortCriterion === "oldest"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiClock className="mr-2" />
                    Oldest
                  </button>
                  <button
                    onClick={() => sortCoaches("random")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      sortCriterion === "random"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiShuffle className="mr-2" />
                    Random
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coaches Grid */}
      {!isLoading && (
        <>
          {displayedCoaches.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No coaches found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCoaches.map((coach) => (
                <div
                  key={coach._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-center pt-6">
                    <div className="relative">
                      <img
                        className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                        src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}
                        alt={coach.name}
                        onError={(e) => {
                          e.target.onerror = null;
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                        <FiUser className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {coach.name}
                      </h2>
                      <p className="text-blue-600 font-semibold mb-3">
                        {coach.coachType}
                      </p>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <FiAward className="text-blue-500 mr-2" />
                        <span>
                          <span className="font-medium">Experience:</span>{" "}
                          {coach.experience || "N/A"} years
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="text-blue-500 mr-2" />
                        <span>
                          <span className="font-medium">Country:</span>{" "}
                          {coach.country || "Not specified"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="text-blue-500 mr-2" />
                        <span>
                          <span className="font-medium">Languages:</span>{" "}
                          {coach.languages?.join(", ") || "Not specified"}
                        </span>
                      </div>
                      {coach.services?.length > 0 && (
                        <div className="flex items-center">
                          <IoIosPricetags className="text-blue-500 mr-2" />
                          <span>
                            <span className="font-medium">Price:</span> £
                            {coach.services[0].price || "Not specified"}
                            <span className="text-sm text-gray-500 ml-1">
                              ({coach.services[0].duration})
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 text-center">
                      <Link
                        to={`/coach/${coach._id}`}
                        className="inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {(totalPages > 1 || !isFilterActive) && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};