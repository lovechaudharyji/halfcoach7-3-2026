import { useEffect, useState } from "react";
import {
  FaUser,
  FaClipboardList,
  FaVideo,
  FaEdit,
  FaTimes,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaSync,
  FaMoneyBillWave,
  FaRegListAlt,
} from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
import axios from "axios";
import EditProfile from "../components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { updateCoachProfile } from "../redux/coachSlice";
import Services from "../components/Services";
import { MySessions } from "../components/MySessions";
import { AccountDetails } from "../components/AccountDetails";
import  {Videocall}  from "../components/Videocall";
import { CoachGuide } from "./CoachGuide";
import { CoachBookUpload } from "./CoachBookUpload";
import { StripePayment } from "./StripePayment";

export const CoachDashboard = () => {
  const coachId = useSelector((state) => state.coach.coach.coachId);
  //  console.log(coachId);

  // const { coachId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coachType: "",
    country: "",
    experience: "",
    qualifications: "",
    languages: [],
    specialization: "",
    availability: "",
    hourlyRate: 0,
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    socialMediaLinks: [],
    certifications: [],
    bio: "",
    profilePicture: "",
    website: "",
    additionalNotes: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCoachDetail = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/coach/coaches/${coachId}`,
      //   {/
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/coach/coaches/${coachId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
      dispatch(updateCoachProfile(response.data.coach));
      setFormData(response.data);
      setLoading(false);
      setRefreshing(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Function to fetch sessions
  const fetchSessions = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/session/${coachId}`
      // );
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/session/${coachId}`
      );

      if (Array.isArray(response.data)) {
        setSessions(response.data);
        setError(null);
      } else {
        console.error("Expected an array but got:", response.data);
        setError("Unexpected response format.");
      }
      setRefreshing(false);
    } catch (error) {
      setError("Failed to load sessions");
      console.error(error);
      setRefreshing(false);
    }
  };

  // Combined refresh function
  const refreshData = () => {
    setRefreshing(true);
    setError(null);
    if (coachId) {
      fetchCoachDetail();
      fetchSessions();
    } else {
      setLoading(false);
      setError("Error in Coach Dashboard");
      setRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [coachId, token, dispatch]);

  const deleteSession = async (sessionId) => {
    try {
      // await axios.delete(
      //   `http://localhost:5000/api/session/${coachId}/${sessionId}`,
      //   {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/session/${coachId}/${sessionId}`,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the sessions state by filtering out the deleted session
      setSessions(sessions.filter((session) => session._id !== sessionId));

      // alert("Session deleted successfully");
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete session");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (profilePictureFile) {
      formDataToSubmit.append("profilePicture", profilePictureFile);
    }

    try {
      // const response = await axios.put(
      //   `http://localhost:5000/api/coach/profile/${coachId}`,
      //   formDataToSubmit,
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/coach/profile/${coachId}`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(response.data.coach);
      dispatch(updateCoachProfile(response.data.coach));
      setIsEditing(false);
      alert("Profile Updated Successfully!");
    } catch (error) {
      setError("Error updating Profile. Please try again.");
    }
  };

  // const baseURL = "http://localhost:5000";
  const baseURL = import.meta.env.VITE_BASE_URL.replace(/\/+$/, "");

  const profilePicture = profile?.profilePicture
    ? `${baseURL}${profile.profilePicture}`
    : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-700 text-white">
          <ul className="space-y-2 p-4">
            {/* Profile Tab */}
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "profile"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("profile");
                setMobileMenuOpen(false);
              }}
            >
              <FaUser className="mr-3" />
              <span className="font-medium">Profile</span>
            </li>

            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "account"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <FaMoneyBillWave className="mr-3" />
              <span className="font-medium">Account Details</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "services"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("services");
                setMobileMenuOpen(false);
              }}
            >
              <FaRegListAlt className="mr-3" />
              <span className="font-medium">My Services</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "sessions"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("sessions");
                setMobileMenuOpen(false);
              }}
            >
              <FaClipboardList className="mr-3" />
              <span className="font-medium">My Sessions</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "sessions"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("video");
                setMobileMenuOpen(false);
              }}
            >
              <FaVideo className="mr-3" />
              <span className="font-medium">Video Call</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "sessions"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("guide");
                setMobileMenuOpen(false);
              }}
            >
              <RiGuideFill className="mr-3" />
              <span className="font-medium">Coach guide</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "book"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("book");
                setMobileMenuOpen(false);
              }}
            >
              <FaBook className="mr-3" />
              <span className="font-medium">e-Book Upload</span>
            </li>

            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "feature"
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-blue-500"
              }`}
              onClick={() => {
                setActiveTab("feature");
                setMobileMenuOpen(false);
              }}
            >
              <FaBook className="mr-3" />
              <span className="font-medium"> feature Yourself</span>
            </li>
          </ul>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64 bg-gradient-to-b from-gray-600 to-gray-800 text-white p-6 shadow-xl">
        <ul className="space-y-3">
          {/* Profile Tab */}
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "profile"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="mr-3" />
            <span className="font-medium">Profile</span>
          </li>

          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "account"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => {
              setActiveTab("account");
              setMobileMenuOpen(false);
            }}
          >
            <FaMoneyBillWave className="mr-3" />
            <span className="font-medium">Account Details</span>
          </li>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "services"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("services")}
          >
            <FaRegListAlt className="mr-3" />
            <span className="font-medium">My Services</span>
          </li>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "sessions"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("sessions")}
          >
            <FaClipboardList className="mr-3" />
            <span className="font-medium">My Sessions</span>
          </li>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "video"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("video")}
          >
            <FaVideo className="mr-3" />
            <span className="font-medium">Video Call</span>
          </li>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "guide"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("guide")}
          >
            <RiGuideFill className="mr-3" />
            <span className="font-medium">Coach Guide</span>
          </li>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "book"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => {
              setActiveTab("book");
              setMobileMenuOpen(false);
            }}
          >
            <FaBook className="mr-3" />
            <span className="font-medium">e-Book Upload</span>
          </li>

          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === "feature"
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-blue-500"
            }`}
            onClick={() => {
              setActiveTab("feature");
              setMobileMenuOpen(false);
            }}
          >
            <FaBook className="mr-3" />
            <span className="font-medium">feature Yourself</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        

        {/* Error Message Display - Added to show refresh prompt */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>
              {error}{" "}
              <button
                onClick={refreshData}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Please reload or refresh the page and go to home page after that come to Dashboard
              </button>
            </p>
          </div>
        )}
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
            className="w-full flex justify-between items-center p-4 font-medium text-gray-700"
          >
            <span>
              {activeTab === "profile"
                ? "Profile"
                : activeTab === "account"
                ? "Account Details"
                : activeTab === "services"
                ? "My Services"
                : activeTab === "sessions"
                ? "My Sessions"
                : activeTab === "video"
                ? "Video Call"
                : activeTab === "guide"
                ? "Coach Guide"
                : activeTab === "book"
                ? "e-Book Upload"
                : activeTab === "feature"
                ? "feature Yourself"
                : "Select an Option"}
            </span>
            {mobileSubmenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {mobileSubmenuOpen && (
            <div className="border-t border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setActiveTab("account");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "account"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Account Details
              </button>
              <button
                onClick={() => {
                  setActiveTab("services");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "services"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                My Services
              </button>
              <button
                onClick={() => {
                  setActiveTab("sessions");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "sessions"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                My Sessions
              </button>
              <button
                onClick={() => {
                  setActiveTab("video");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "video"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Video Call
              </button>
              <button
                onClick={() => {
                  setActiveTab("guide");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "guide"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Coach Guide
              </button>
              <button
                onClick={() => {
                  setActiveTab("book");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "book"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                e-Book Upload
              </button>
              <button
                onClick={() => {
                  setActiveTab("feature");
                  setMobileSubmenuOpen(false);
                }}
                className={`w-full text-left p-4 ${
                  activeTab === "feature"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                feature Yourself
              </button>
            </div>
          )}
        </div>

        {activeTab === "profile" && profile && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 md:p-6 text-white">
              <div className="flex  md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {profile.name}
                  </h2>
                  <p className="text-blue-100">{profile.coachType}</p>
                </div>
                {profilePicture && (
                  <div className="relative">
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-white p-1 md:p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                        <FaEdit className="text-blue-500 text-sm md:text-base" />
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Display Profile or Edit Form */}
            <div className="p-4 md:p-6">
              {isEditing ? (
                <EditProfile
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  handleFileChange={handleFileChange}
                  isEditing={isEditing}
                />
              ) : (
                <div className="space-y-6 md:space-y-8">
                  {/* Personal Details Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DetailItem label="Name" value={profile.name} />
                      <DetailItem label="Email" value={profile.email} />
                      <DetailItem
                        label="Coach Type"
                        value={profile.coachType}
                      />
                      <DetailItem label="Country" value={profile.country} />
                      <DetailItem
                        label="Experience"
                        value={profile.experience}
                      />
                      <DetailItem
                        label="Qualifications"
                        value={profile.qualifications}
                      />
                    </div>
                  </section>

                  {/* Contact Info Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Contact Info
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DetailItem
                        label="Phone Number"
                        value={profile.phoneNumber}
                      />
                      <DetailItem label="Address" value={profile.address} />
                      <DetailItem label="City" value={profile.city} />
                      <DetailItem label="State" value={profile.state} />
                      <DetailItem label="Zip Code" value={profile.zipCode} />
                      <DetailItem
                        label="Availability"
                        value={profile.availability}
                      />
                    </div>
                  </section>

                  {/* Languages & Specialization Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Languages & Specialization
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DetailItem
                        label="Languages"
                        value={profile.languages.join(", ") || "N/A"}
                        isArray={true}
                      />
                      <DetailItem
                        label="Specialization"
                        value={profile.specialization}
                      />
                    </div>
                  </section>

                  {/* Rate & Website Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Rate & Website
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DetailItem
                        label="Hourly Rate"
                        value={`£${profile.hourlyRate || "10.00"}`}
                      />
                      <DetailItem
                        label="Website"
                        value={profile.website}
                        isLink={true}
                      />
                    </div>
                  </section>

                  {/* Bio & Additional Notes Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Bio & Additional Notes
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                      <DetailItem
                        label="Bio"
                        value={profile.bio}
                        isLongText={true} 
                      />
                      <DetailItem
                        label="Additional Notes"
                        value={profile.additionalNotes}
                        isLongText={true}
                      />
                    </div>
                  </section>

                  {/* Social Media & Certifications Section */}
                  <section className="bg-gray-50 p-4 md:p-5 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                      Social Media & Certifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DetailItem
                        label="Social Media Links"
                        value={profile.socialMediaLinks.join(", ") || "N/A"}
                        isArray={true}
                      />
                      <DetailItem
                        label="Certifications"
                        value={profile.certifications.join(", ") || "N/A"}
                        isArray={true}
                      />
                    </div>
                  </section>
                </div>
              )}

              {/* Edit Button */}
              <div className="mt-4 md:mt-6 flex justify-end">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                    isEditing
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <FaTimes className="mr-1 md:mr-2" />
                      <span>Cancel Edit</span>
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-1 md:mr-2" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "services" && (
          <Services coachId={coachId} token={token} />
        )}

        {activeTab === "sessions" && (
          <MySessions sessions={sessions} deleteSession={deleteSession} />
        )}
        {activeTab === "video" && <Videocall />}
        {activeTab === "guide" && <CoachGuide />}
        {activeTab === "book" && <CoachBookUpload />}
        {activeTab === "feature" && <StripePayment />}

        {activeTab === "account" && <AccountDetails />}
      </div>
    </div>
  );
};

// Reusable DetailItem component for consistent styling
const DetailItem = ({
  label,
  value,
  isLongText = false,
  isArray = false,
  isLink = false,
}) => {
  if (!value || (isArray && value.length === 0)) value = "N/A";

  return (
    <div>
      <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
      {isLongText ? (
        <p className="mt-1 text-sm sm:text-base text-gray-700 whitespace-pre-line">
          {value}
        </p>
      ) : isLink && value !== "N/A" ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm sm:text-base text-blue-500 hover:underline block"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm sm:text-base text-gray-700">{value}</p>
      )}
    </div>
  );
};