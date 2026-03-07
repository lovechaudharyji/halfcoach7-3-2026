import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate here
import {
  FaUserAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaCertificate,
  FaShareAlt,
  FaInfoCircle,
  FaStar,
  FaCommentAlt,
} from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdWork, MdPayment, MdAccessTime } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

export const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [books, setBooks] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);


  const user = useSelector((state) => state.user.user);
   console.log(user);
   const handleDownload = async (bookId) => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/books/checkout-session/${bookId}`);
        window.location.href = res.data.url;
      } catch (err) {
        alert('Payment session failed');
      }
    };
  

  const navigate = useNavigate(); // Create the navigate function


  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/coach/coaches/${id}`
        );
        setCoach(response.data);
      } catch (error) {
        console.log("Error fetching coach profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${id}`
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/books/${id}`
        );
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    if (id) fetchBooks();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderField = (fieldValue) => {
    return fieldValue && fieldValue.length > 0 ? fieldValue : "Not specified";
  };

  const renderLanguage = (languages) => {
    return languages && languages.length > 0
      ? languages.join(", ")
      : "Not specified";
  };

  const formatLocation = (c) => {
    const parts = [c.address, c.city, c.state, c.zipCode, c.country]
      .map((v) => (v || "").trim())
      .filter((v) => v.length > 0);
    return parts.length ? parts.join(", ") : "Not specified";
  };

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
          coachId: id,
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
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${id}`
        );
        setReviews(refreshed.data.reviews);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

//   const handleDeleteReview = async (reviewId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this review?");
//   if (!confirmDelete) return;

//   try {
//     const res = await fetch(`/api/reviews/ratings/${reviewId}`, {
//       method: "DELETE",
//     });

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
const token = useSelector((state) => state.user.token);
const handleDeleteReview = async (reviewId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this review?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );

    if (res.ok) {
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete review");
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    alert("Something went wrong");
  }
};


  const handleSessionBooking = async (service) => {
    if (!user) {
      alert("Please login to book a session.");
      navigate("/login");
      return;
    }

    const totalWithFee = Math.round(service.price * 1.04);

    const confirmBooking = window.confirm(
      `A 4% platform fee will be added to the price.\n\nOriginal Price: £${service.price}\nTotal Price: £${totalWithFee}\n\nDo you want to continue?`
    );

    if (!confirmBooking) {
      return; // Exit if the user cancels
    }

    try {
      setIsBooking(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/session/create-checkout-session`,
        {
          coachId: id,
          userId: user.userId,
          serviceDuration: service.duration,
          servicePrice: totalWithFee,
          serviceDescription: service.description,
          userName: user.username,
          userEmail: user.email,
          coachName: coach.name,
          coachEmail: coach.email,
          successUrl: `${
            import.meta.env.VITE_FRONTEND_URL
          }/payment-successs?coachId=${id}&userId=${
            user.userId
          }&price=${totalWithFee}&duration=${
            service.duration
          }&desc=${encodeURIComponent(
            service.description
          )}&coachName=${encodeURIComponent(
            coach.name
          )}&userName=${encodeURIComponent(
            user.username
          )}&coachEmail=${encodeURIComponent(
            coach.email
          )}&userEmail=${encodeURIComponent(user.email)}`,
          cancelUrl: `${import.meta.env.VITE_FRONTEND_URL}/payment-failure`,
        }
      );

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Stripe URL not found.");
      }
    } catch (error) {
      console.error("Error starting payment:", error);
      alert("Payment process failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <p className="text-2xl font-semibold text-red-500 bg-white p-6 rounded-xl shadow-lg">
          Coach not found!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Profile Picture */}
          <div className="relative group">
            <img
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full border-4 border-white shadow-xl ring-4 ring-blue-300"
              src={`${import.meta.env.VITE_BASE_URL}${
                coach.profilePicture.startsWith("/")
                  ? coach.profilePicture
                  : "/" + coach.profilePicture
              }`}
              alt={coach.name}
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {coach.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800  rounded-full text-lg font-medium">
                {coach.coachType}
              </span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              {coach.bio ||
                `Professional ${coach.coachType} with ${renderField(
                  coach.experience
                )} years of experience`}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}

            {/* Services Section */}
            {coach.services && coach.services.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  {/* <FaRegClock className="text-blue-500 text-2xl mr-3" /> */}
                  <h2 className="text-2xl font-bold text-gray-800">
                    Services Offered
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {coach.services.map((service) => (
                    <div
                      key={service._id}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold flex text-gray-800 gap-1.5">
                          <FaRegClock className="text-blue-500 my-auto text-lg" />
                          {service.duration}
                        </h3>
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                          £{service.price}
                        </span>
                      </div>
                      {service.description && (
                        <p className="text-gray-600 mt-3">
                          {service.description}
                        </p>
                      )}
                      <button
                        className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        onClick={() => handleSessionBooking(service)} // Use the refactored method
                        disabled={isBooking} // Disable the button if booking is in progress
                      >
                        {isBooking ? "Booking..." : "Book Session"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <FaUserAlt className="text-blue-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {coach.name} is a {coach.coachType} with{" "}
                  {renderField(coach.experience)} years of experience,
                  specializing in {renderField(coach.specialization)}. Fluent in{" "}
                  {renderLanguage(coach.languages)}.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start">
                    <MdWork className="text-blue-500 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Experience
                      </h3>
                      <p className="text-gray-600">
                        {renderField(coach.experience)} years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GiSkills className="text-blue-500 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Specialization
                      </h3>
                      <p className="text-gray-600">
                        {renderField(coach.specialization)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCertificate className="text-blue-500 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Qualifications
                      </h3>
                      <p className="text-gray-600">
                        {renderField(coach.qualifications)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-500 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Additional Notes
                      </h3>
                      <p className="text-gray-600">
                        {renderField(coach.additionalNotes)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <FaCertificate className="text-blue-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Certifications
                </h2>
              </div>
              {coach.certifications && coach.certifications.length > 0 ? (
                <ul className="space-y-2">
                  {coach.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No certifications listed</p>
              )}

            
            
            </div>

            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-4 mt-1">
                    <FaMapMarkerAlt className="text-blue-500 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-gray-700">
                      {formatLocation(coach)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-full mr-4">
                    <MdAccessTime className="text-yellow-500 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Availability
                    </h3>
                    <p className="text-gray-700">
                      {renderField(coach.availability)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <MdPayment className="text-green-500 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Hourly Rate
                    </h3>
                    <p className="text-gray-700">
                      {coach.hourlyRate > 0
                        ? `£${coach.hourlyRate}/hr`
                        : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            


          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-6">
              <div className="flex items-center mb-6 ">
                <h2 className="text-2xl font-bold text-gray-800">
                  Books by {coach.name}
                </h2>
              </div>

              {books.length === 0 ? (
                <p className="text-gray-500">
                  This coach hasn't uploaded any books yet.
                </p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {books.map((book) => (
                    <li
                      key={book._id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {book.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 flex justify-end">
                        - {book.description}
                      </p>
                      <p className="text-green-600 font-semibold mt-2">
                        £{(book.price * 1.10).toFixed(2)}
                      </p>
                      <button
        onClick={() => handleDownload(book._id)}
        className="text-blue-600 hover:underline text-xs"
      >
        Download
      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaStar className="text-yellow-400 mr-2 text-2xl" /> Reviews &
            Ratings
          </h2>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="mb-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Rating
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
              <FaCommentAlt className="mx-auto text-gray-300 text-4xl mb-3" />
              <p className="text-gray-500 font-medium">
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
                      className="bg-gray-50 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">
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
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
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
                        {user && user.isAdmin ? (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
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
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {showAllReviews ? "View Less" : "View More Reviews"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
