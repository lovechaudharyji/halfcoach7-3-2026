
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaArrowLeft,
//   FaUser,
//   FaEnvelope,
//   FaGlobe,
//   FaPhone,
//   FaCalendarAlt,
//   FaClock,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaPaypal,
//   FaUniversity,
//   FaStar,
//   FaCommentAlt,
//   FaListUl,
//   FaCertificate,
//   FaLanguage,
//   FaInfoCircle,
// } from "react-icons/fa";
// import { MdWork, MdPayment, MdAccountBalance } from "react-icons/md";
// import { useSelector } from "react-redux";

// export const CoachDetails = ({ coach, onBack }) => {
//   const [sessions, setSessions] = useState([]);
//   const [accountDetails, setAccountDetails] = useState(null);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5);
//   const [showAllReviews, setShowAllReviews] = useState(false);

//   const user = useSelector((state) => state.user?.user);

//   const handleResetEarnings = async () => {
//     if (
//       window.confirm(
//         "Are you sure you want to reset your earnings to 0? This cannot be undone."
//       )
//     ) {
//       try {
       
//         const response = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/api/account/${
//             coach._id
//           }/reset-earnings`
//         );
//         setTotalEarnings(response.data.totalEarnings);
//       } catch (error) {
//         console.error("Error resetting total earnings:", error);
//         alert("Failed to reset total earnings. Please try again.");
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchSessions = async () => {
     
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/session/${coach._id}`
//         );
//         setSessions(response.data);
//       } catch (error) {
//         console.error("Error fetching sessions:", error);
//       }
//     };

//     const fetchAccountDetails = async () => {
      
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/account/${coach._id}`
//         );
//         setAccountDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching account details:", error);
//       }
//     };

//     if (coach?._id) {
//       fetchSessions();
//       fetchAccountDetails();
//     }
//   }, [coach]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${coach._id}`
//         );
//         setReviews(response.data.reviews);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     if (coach?._id) fetchReviews();
//   }, [coach]);



// // this is delet button
// const handleDeleteReview = async (reviewId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this review?");
//   if (!confirmDelete) return;

//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${reviewId}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (res.ok) {
//       setReviews((prev) => prev.filter((review) => review._id !== reviewId));
//     } else {
//       const data = await res.json();
//       alert(data.message || "Failed to delete review");
//     }
//   } catch (error) {
//     console.error("Error deleting review:", error);
//     alert("Something went wrong");
//   }
// };




//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("You must be logged in to submit a review.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings`,
//         {
//           coachId: coach._id,
//           userId: user.userId,
//           rating,
//           reviewText,
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setReviewText("");
//         setRating(5);
//         // Refresh reviews
//         const refreshed = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${coach._id}`
//         );
//         setReviews(refreshed.data.reviews);
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review.");
//     }
//   };

//   if (!coach) return null;

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <button
//         onClick={onBack}
//         className="flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors"
//       >
//         <FaArrowLeft className="mr-2" /> Back to Coaches
//       </button>

//       {/* Coach Profile Section */}
//       <div className="flex flex-col md:flex-row gap-8 mb-12">
//         <div className="flex-shrink-0">
         
//           <img
//             src={`${import.meta.env.VITE_BASE_URL}${
//               coach.profilePicture.startsWith("/")
//                 ? coach.profilePicture
//                 : "/" + coach.profilePicture
//             }`}
//             alt="Profile"
//             className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
//           />
//         </div>

//         <div className="flex-grow">
//           <h2 className="text-4xl font-bold mb-4 flex items-center">
//             <FaUser className="mr-3 text-blue-400" /> {coach.name}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="flex items-center">
//               <FaEnvelope className="mr-3 text-gray-400" />
//               <span>{coach.email}</span>
//             </div>
//             <div className="flex items-center">
//               <MdWork className="mr-3 text-gray-400" />
//               <span>{coach.coachType}</span>
//             </div>
//             <div className="flex items-center">
//               <FaGlobe className="mr-3 text-gray-400" />
//               <span>{coach.country}</span>
//             </div>
//             <div className="flex items-center">
//               <FaPhone className="mr-3 text-gray-400" />
//               <span>{coach.phoneNumber}</span>
//             </div>
//           </div>

//           <div className="bg-gray-800 rounded-lg p-4 mb-4">
//             <div className="flex items-center mb-2">
//               <FaInfoCircle className="mr-2 text-blue-400" />
//               <span className="font-semibold">Bio</span>
//             </div>
//             <p>{coach.bio}</p>
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <div className="bg-gray-800 rounded-lg p-3">
//               <div className="flex items-center">
//                 <FaCalendarAlt className="mr-2 text-blue-400" />
//                 <span className="font-semibold">Availability:</span>
//               </div>
//               <p>{coach.availability}</p>
//             </div>

//             <div className="bg-gray-800 rounded-lg p-3">
//               <div className="flex items-center">
//                 <FaLanguage className="mr-2 text-blue-400" />
//                 <span className="font-semibold">Languages:</span>
//               </div>
//               <p>{coach.languages.join(", ")}</p>
//             </div>

//             <div className="bg-gray-800 rounded-lg p-3">
//               <div className="flex items-center">
//                 <FaCertificate className="mr-2 text-blue-400" />
//                 <span className="font-semibold">Certifications:</span>
//               </div>
//               <p>{coach.certifications.join(", ")}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="mb-12">
//         <h3 className="text-2xl font-bold mb-6 flex items-center">
//           <FaListUl className="mr-3 text-blue-400" /> Services Offered
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {coach.services.map((service, idx) => (
//             <div
//               key={idx}
//               className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-colors"
//             >
//               <p className="text-lg font-semibold mb-2">
//                 {service.description}
//               </p>
//               <div className="flex justify-between text-sm text-gray-300">
//                 <span className="flex items-center">
//                   <FaClock className="mr-1" /> {service.duration}
//                 </span>
//                 <span className="flex items-center">
//                   <FaMoneyBillWave className="mr-1" /> £{service.price}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sessions Section */}
//       <div className="mb-12">
//         <h3 className="text-2xl font-bold mb-6 flex items-center">
//           <FaCalendarAlt className="mr-3 text-blue-400" /> Upcoming Sessions
//         </h3>
//         {sessions.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sessions.map((session) => (
//               <div
//                 key={session._id}
//                 className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-blue-500"
//               >
//                 <div className="flex items-center mb-3">
//                   <FaUser className="mr-2 text-blue-400" />
//                   <p className="text-lg font-semibold">
//                     {session.userId?.username || "Unassigned"}
//                   </p>
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center text-gray-300">
//                     <FaEnvelope className="mr-2" />
//                     {session.userId?.email || "No email"}
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <FaInfoCircle className="mr-2" />
//                     {session.serviceDescription || "No description"}
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <FaClock className="mr-2" /> {session.serviceDuration}
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <FaMoneyBillWave className="mr-2" /> ${session.servicePrice}
//                   </div>
//                   <div className="flex items-center text-gray-300 pt-2 border-t border-gray-700 mt-2">
//                     <FaCalendarAlt className="mr-2" />
//                     {new Date(session.sessionDate).toLocaleString()}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-gray-800 rounded-lg p-6 text-center">
//             <p className="text-gray-400">No sessions found for this coach.</p>
//           </div>
//         )}
//       </div>

//       {/* Account Details Section */}
//       <div>
//         <h3 className="text-2xl font-bold mb-6 flex items-center">
//           <MdPayment className="mr-3 text-blue-400" /> Account Details
//         </h3>
//         {accountDetails ? (
//           <div className="bg-gray-800 rounded-xl p-6 shadow-md">
//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaCreditCard className="mr-2 text-blue-400" />
//                 <h4 className="text-lg font-semibold">Payout Information</h4>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center">
//                   <span className="font-medium mr-2">Method:</span>
//                   <span className="flex items-center">
//                     {accountDetails.preferredPayoutMethod === "paypal" ? (
//                       <>
//                         <FaPaypal className="mr-1 text-blue-500" /> PayPal
//                       </>
//                     ) : (
//                       <>
//                         <MdAccountBalance className="mr-1 text-blue-500" /> Bank
//                         Transfer
//                       </>
//                     )}
//                   </span>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Total Earnings:</span>
//                     <span className="flex items-center text-green-400">
//                       <FaMoneyBillWave className="mr-1" /> £
//                       {accountDetails.totalEarning}
//                     </span>
//                   </div>
//                   <button
//                     onClick={handleResetEarnings}
//                     className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
//                   >
//                     <span>Reset Earnings</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {accountDetails.preferredPayoutMethod === "paypal" && (
//               <div className="bg-gray-700 rounded-lg p-4 mb-6">
//                 <div className="flex items-center mb-2">
//                   <FaPaypal className="mr-2 text-blue-400" />
//                   <h4 className="font-semibold">PayPal Details</h4>
//                 </div>
//                 <p className="flex items-center">
//                   <FaEnvelope className="mr-2" />{" "}
//                   {accountDetails.paypalDetails?.email}
//                 </p>
//               </div>
//             )}

//             {accountDetails.bankDetails && (
//               <div className="bg-gray-700 rounded-lg p-4">
//                 <div className="flex items-center mb-3">
//                   <FaUniversity className="mr-2 text-blue-400" />
//                   <h4 className="font-semibold">Bank Information</h4>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Bank:</span>
//                     <span>{accountDetails.bankDetails.bankName || "N/A"} </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Account Holder:</span>
//                     <span>
//                       {accountDetails.bankDetails.accountHolderName || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Account Number:</span>
//                     <span>
//                       {accountDetails.bankDetails.accountNumber || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Routing Number:</span>
//                     <span>
//                       {accountDetails.bankDetails.routingNumber || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Sort Code:</span>
//                     <span>{accountDetails.bankDetails.sortCode || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">CLABE Number:</span>
//                     <span>
//                       {accountDetails.bankDetails.clabeNumber || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">IFSC Code:</span>
//                     <span>{accountDetails.bankDetails.ifscCode || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">BSB Code:</span>
//                     <span>{accountDetails.bankDetails.bsbCode || "N/A"}</span>
//                   </div>

//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">SWIFT/BIC:</span>
//                     <span>
//                       {accountDetails.bankDetails.swiftBicCode || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium mr-2">Location:</span>
//                     <span>
//                       {accountDetails.bankDetails.bankAddress.city || "N/A"},{" "}
//                       {accountDetails.bankDetails.bankAddress.country || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="bg-gray-800 rounded-lg p-6 text-center">
//             <p className="text-gray-400">
//               No account details found for this coach.
//             </p>
//           </div>
//         )}
//       </div>
//       {/* Ratings & Reviews Section */}
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 mt-12 transition-all duration-300 hover:shadow-xl">
//         <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//           <FaStar className="text-yellow-400 mr-2 text-2xl" /> Reviews & Ratings
//         </h2>

//         {/* Review Form */}
//         <form onSubmit={handleReviewSubmit} className="mb-8 space-y-6">
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-200 mb-1">
//               Your Rating
//             </label>
//             <div className="flex items-center space-x-2">
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="p-2 border border-gray-500 rounded-md w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
//               >
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <option key={r} value={r}>
//                     {r} Star{r > 1 ? "s" : ""}
//                   </option>
//                 ))}
//               </select>
//               <div className="flex ml-2">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={`text-xl ${
//                       i < rating ? "text-yellow-400" : "text-gray-500"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-200 mb-1">
//               Your Review
//             </label>
//             <textarea
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               rows={4}
//               className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
//               placeholder="Share your experience in detail..."
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
//           >
//             Submit Review
//           </button>
//         </form>

//           {reviews.length === 0 ? (
//   <div className="text-center py-8">
//     <FaCommentAlt className="mx-auto text-gray-300 text-4xl mb-3" />
//     <p className="text-gray-500 font-medium">
//       No reviews yet. Be the first to share your thoughts!
//     </p>
//   </div>
// ) : (
//   <>
//     <div className="space-y-6">
//       {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
//         <div
//           key={review._id}
//           className="bg-gray-50 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-sm relative"
//         >
//           <div className="mb-3">
//             <p className="font-semibold text-gray-800">
//               {review.user?.username || "Anonymous"}
//             </p>
//             <div className="flex items-center mt-1">
//               <div className="flex mr-2">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={`${
//                       i < review.rating
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-500">
//                 {new Date(review.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>

//           <p className="text-gray-700 leading-relaxed mb-2">
//             {review.reviewText}
//           </p>

//           {/* Delete Button */}
//           <button
//             onClick={() => handleDeleteReview(review._id)}
//             className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>

//     {reviews.length > 3 && (
//       <div className="mt-6 text-center">
//         <button
//           onClick={() => setShowAllReviews(!showAllReviews)}
//           className="text-blue-600 font-medium hover:underline"
//         >
//           {showAllReviews ? "View Less" : "View More Reviews"}
//         </button>
//       </div>
//     )}
//   </>
//         )}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCreditCard,
  FaPaypal,
  FaUniversity,
  FaStar,
  FaCommentAlt,
  FaListUl,
  FaCertificate,
  FaLanguage,
  FaInfoCircle,
} from "react-icons/fa";
import { MdWork, MdPayment, MdAccountBalance } from "react-icons/md";
import { useSelector } from "react-redux";

export const CoachDetails = ({ coach, onBack }) => {
  const [sessions, setSessions] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const user = useSelector((state) => state.user?.user);

  const handleResetEarnings = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset your earnings to 0? This cannot be undone."
      )
    ) {
      try {
        // const response = await axios.post(
        //   `http://localhost:5000/api/account/${coach._id}/reset-earnings`
        // );
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/account/${
            coach._id
          }/reset-earnings`
        );
        setTotalEarnings(response.data.totalEarnings);
      } catch (error) {
        console.error("Error resetting total earnings:", error);
        alert("Failed to reset total earnings. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      // try {
      //   const response = await axios.get(
      //     `http://localhost:5000/api/session/${coach._id}`
      //   );
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/session/${coach._id}`
        );
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    const fetchAccountDetails = async () => {
      // try {
      //   const response = await axios.get(
      //     `http://localhost:5000/api/account/${coach._id}`
      //   );
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/account/${coach._id}`
        );
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    if (coach?._id) {
      fetchSessions();
      fetchAccountDetails();
    }
  }, [coach]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${coach._id}`
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (coach?._id) fetchReviews();
  }, [coach]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings`,
        {
          coachId: coach._id,
          userId: user.userId,
          rating,
          reviewText,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setReviewText("");
        setRating(5);
        // Refresh reviews
        const refreshed = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${coach._id}`
        );
        setReviews(refreshed.data.reviews);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  if (!coach) return null;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={onBack}
        className="flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Coaches
      </button>

      {/* Coach Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          {/* <img
            src={`http://localhost:5000${coach.profilePicture}`}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          /> */}
          <img
            src={`${import.meta.env.VITE_BASE_URL}${
              coach.profilePicture.startsWith("/")
                ? coach.profilePicture
                : "/" + coach.profilePicture
            }`}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        </div>

        <div className="flex-grow">
          <h2 className="text-4xl font-bold mb-4 flex items-center">
            <FaUser className="mr-3 text-blue-400" /> {coach.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-gray-400" />
              <span>{coach.email}</span>
            </div>
            <div className="flex items-center">
              <MdWork className="mr-3 text-gray-400" />
              <span>{coach.coachType}</span>
            </div>
            <div className="flex items-center">
              <FaGlobe className="mr-3 text-gray-400" />
              <span>{coach.country}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-3 text-gray-400" />
              <span>{coach.phoneNumber}</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <FaInfoCircle className="mr-2 text-blue-400" />
              <span className="font-semibold">Bio</span>
            </div>
            <p>{coach.bio}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-400" />
                <span className="font-semibold">Availability:</span>
              </div>
              <p>{coach.availability}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center">
                <FaLanguage className="mr-2 text-blue-400" />
                <span className="font-semibold">Languages:</span>
              </div>
              <p>{coach.languages.join(", ")}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center">
                <FaCertificate className="mr-2 text-blue-400" />
                <span className="font-semibold">Certifications:</span>
              </div>
              <p>{coach.certifications.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <FaListUl className="mr-3 text-blue-400" /> Services Offered
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coach.services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-colors"
            >
              <p className="text-lg font-semibold mb-2">
                {service.description}
              </p>
              <div className="flex justify-between text-sm text-gray-300">
                <span className="flex items-center">
                  <FaClock className="mr-1" /> {service.duration}
                </span>
                <span className="flex items-center">
                  <FaMoneyBillWave className="mr-1" /> £{service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <FaCalendarAlt className="mr-3 text-blue-400" /> Upcoming Sessions
        </h3>
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-blue-500"
              >
                <div className="flex items-center mb-3">
                  <FaUser className="mr-2 text-blue-400" />
                  <p className="text-lg font-semibold">
                    {session.userId?.username || "Unassigned"}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-300">
                    <FaEnvelope className="mr-2" />
                    {session.userId?.email || "No email"}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaInfoCircle className="mr-2" />
                    {session.serviceDescription || "No description"}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaClock className="mr-2" /> {session.serviceDuration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaMoneyBillWave className="mr-2" /> ${session.servicePrice}
                  </div>
                  <div className="flex items-center text-gray-300 pt-2 border-t border-gray-700 mt-2">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(session.sessionDate).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">No sessions found for this coach.</p>
          </div>
        )}
      </div>

      {/* Account Details Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <MdPayment className="mr-3 text-blue-400" /> Account Details
        </h3>
        {accountDetails ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaCreditCard className="mr-2 text-blue-400" />
                <h4 className="text-lg font-semibold">Payout Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Method:</span>
                  <span className="flex items-center">
                    {accountDetails.preferredPayoutMethod === "paypal" ? (
                      <>
                        <FaPaypal className="mr-1 text-blue-500" /> PayPal
                      </>
                    ) : (
                      <>
                        <MdAccountBalance className="mr-1 text-blue-500" /> Bank
                        Transfer
                      </>
                    )}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Total Earnings:</span>
                    <span className="flex items-center text-green-400">
                      <FaMoneyBillWave className="mr-1" /> £
                      {accountDetails.totalEarning}
                    </span>
                  </div>
                  <button
                    onClick={handleResetEarnings}
                    className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Reset Earnings</span>
                  </button>
                </div>
              </div>
            </div>

            {accountDetails.preferredPayoutMethod === "paypal" && (
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <FaPaypal className="mr-2 text-blue-400" />
                  <h4 className="font-semibold">PayPal Details</h4>
                </div>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" />{" "}
                  {accountDetails.paypalDetails?.email}
                </p>
              </div>
            )}

            {accountDetails.bankDetails && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <FaUniversity className="mr-2 text-blue-400" />
                  <h4 className="font-semibold">Bank Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Bank:</span>
                    <span>{accountDetails.bankDetails.bankName || "N/A"} </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Account Holder:</span>
                    <span>
                      {accountDetails.bankDetails.accountHolderName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Account Number:</span>
                    <span>
                      {accountDetails.bankDetails.accountNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Routing Number:</span>
                    <span>
                      {accountDetails.bankDetails.routingNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Sort Code:</span>
                    <span>{accountDetails.bankDetails.sortCode || "N/A"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">CLABE Number:</span>
                    <span>
                      {accountDetails.bankDetails.clabeNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">IFSC Code:</span>
                    <span>{accountDetails.bankDetails.ifscCode || "N/A"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">BSB Code:</span>
                    <span>{accountDetails.bankDetails.bsbCode || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium mr-2">SWIFT/BIC:</span>
                    <span>
                      {accountDetails.bankDetails.swiftBicCode || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Location:</span>
                    <span>
                      {accountDetails.bankDetails.bankAddress.city || "N/A"},{" "}
                      {accountDetails.bankDetails.bankAddress.country || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">
              No account details found for this coach.
            </p>
          </div>
        )}
      </div>
      {/* Ratings & Reviews Section */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 mt-12 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <FaStar className="text-yellow-400 mr-2 text-2xl" /> Reviews & Ratings
        </h2>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Your Rating
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border border-gray-500 rounded-md w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i < rating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
              placeholder="Share your experience in detail..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Submit Review
          </button>
        </form>

        {/* Review List */}
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <FaCommentAlt className="mx-auto text-gray-700 text-4xl mb-3" />
            <p className="text-gray-300 font-medium">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {(showAllReviews ? reviews : reviews.slice(0, 3)).map(
                (review) => (
                  <div
                    key={review._id}
                    className="bg-gray-900 p-5 rounded-xl border border-gray-700 transition-all duration-300 hover:bg-gray-800 hover:shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-white">
                          {review.user?.username || "Anonymous"}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      {review.reviewText}
                    </p>
                  </div>
                )
              )}
            </div>
            {reviews.length > 3 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-blue-400 font-medium hover:underline"
                >
                  {showAllReviews ? "View Less" : "View More Reviews"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
