import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useSelector } from "react-redux";

export const UserDashboard = () => {
  const userId = useSelector((state) => state.user.user.userId);
  console.log(userId);

  // const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const fetchData = async () => {
    // try {
    //   // Fetch user data
    //   const userResponse = await axios.get(
    //     `http://localhost:5000/api/auth/users/${userId}`
    //   );
    try {
      // Fetch user data
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/users/${userId}`
      );
      setUserData(userResponse.data);

      // Fetch user sessions
      setSessionsLoading(true);
      // const sessionsResponse = await axios.get(
      //   `http://localhost:5000/api/session/user/${userId}`
      // );
      const sessionsResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/session/user/${userId}`
      );
      if (sessionsResponse.data.message) {
        setError(sessionsResponse.data.message);
      } else {
        setSessions(
          Array.isArray(sessionsResponse.data) ? sessionsResponse.data : []
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">
              {userData?.username || "User"}
            </span>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-50 transition-all"
            >
              <FiRefreshCw
                className={`${sessionsLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <div>Check Your Email after booking the session</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-2xl">
                    <FaUser />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{userData?.username}</h2>
                    <p className="text-blue-100">{userData?.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <DetailItem
                  icon={<FaEnvelope className="text-blue-500" />}
                  label="Email"
                  value={userData?.email}
                />
                <DetailItem
                  icon={<FaPhone className="text-blue-500" />}
                  label="Phone"
                  value={userData?.phone || "Not provided"}
                />
              </div>
            </div>
          </div>

          {/* Sessions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Upcoming Sessions
                </h2>
              </div>

              {sessionsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error && error.includes("No sessions") ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <FaInfoCircle className="text-blue-500 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {error}
                  </h3>
                  <p className="text-gray-500">Book a session to get started</p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <FaInfoCircle className="text-blue-500 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No upcoming sessions
                  </h3>
                  <p className="text-gray-500">Book a session to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {sessions.map((session) => (
                    <div
                      key={session._id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Session Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-3xl font-semibold text-gray-800">
                              {session.serviceDescription}
                            </h3>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              <FaMoneyBillWave className="mr-1" />£
                              {session.servicePrice}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-gray-500">
                              <FaUser className="mr-2 text-blue-500" />
                              <span>{session.coachId?.name || "Coach"}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaClock className="mr-2 text-blue-500" />
                              <span>{session.serviceDuration}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaCalendarAlt className="mr-2 text-blue-500" />
                              <span>
                                {new Date(
                                  session.sessionDate
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-3xl font-bold ">
          For any refund and other details contact on{" "}
          <p className=" text-red-600">contact@halfcoach.com</p>
        </p>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-gray-400">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-700">{value}</p>
    </div>
  </div>
);
