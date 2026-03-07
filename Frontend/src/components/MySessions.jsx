import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaClock,
  FaCalendarAlt,
  FaSync,
  FaPoundSign,
  FaTrashAlt,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdClose } from "react-icons/md";

export const MySessions = ({ sessions, deleteSession }) => {
  const coachId = useSelector((state) => state.coach.coach.coachId);
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    meetingLink: "",
    date: "",
    time: "",
    additionalNotes: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [startDate, setStartDate] = useState(null);

  // Fetch total earnings on component load
  useEffect(() => {
    fetchTotalEarnings();
  }, [coachId]);

  const fetchTotalEarnings = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/account/${coachId}/totalearnings`
      // );
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/account/${coachId}/totalearnings`
      );
      setTotalEarnings(response.data.totalEarnings || 0);
    } catch (error) {
      console.error("Error fetching total earnings:", error);
      setTotalEarnings(0);
    }
  };

  const handleCardClick = (session) => {
    setSelectedSession(session);
    setEmailSent(false);
    if (session.sessionDate) {
      const dateObj = new Date(session.sessionDate);
      setFormData({
        ...formData,
        date: dateObj.toISOString().split("T")[0],
        time: dateObj.toTimeString().substring(0, 5),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const emailData = {
        to: selectedSession.userId?.email || "",
        subject: "Your Coaching Session Details",
        message: `Hello ${selectedSession.userId?.username || "there"},
        
Your session "${selectedSession.serviceDescription}" has been scheduled.

Meeting Details:
- Date: ${formData.date}
- Time: ${formData.time}
- Meeting Link: ${formData.meetingLink}
${
  formData.additionalNotes
    ? `\nAdditional Notes: ${formData.additionalNotes}`
    : ""
}

Looking forward to our session! 

Best regards,
[Your Name]`,
      };

      // 1. Send Email
      // await axios.post("http://localhost:5000/api/booking/send", emailData);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/booking/send`,
        emailData
      );

      // 2. Store the meeting link in the backend
      // await axios.post("http://localhost:5000/api/session/updatemeeting", {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/session/updatemeeting`,
          {
        sessionId: selectedSession._id,
        meetingLink: formData.meetingLink,
      });

      // 3. Update UI state
      setEmailSent(true);
      setSelectedSession((prev) => ({
        ...prev,
        meetingLink: formData.meetingLink,
      }));
    } catch (error) {
      console.error("Error sending email or saving meeting link:", error);
      alert("Failed to send email or save the meeting link. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setSelectedSession(null);
    setFormData({
      meetingLink: "",
      date: "",
      time: "",
      additionalNotes: "",
    });
  };

  const handleDeleteSession = async (sessionId, sessionPrice) => {
    if (!startDate) {
      setStartDate(new Date().toISOString());
    }

    if (
      window.confirm("Are you sure you want to mark this session as complete?")
    ) {
      const reducedEarnings = sessionPrice * 0.8;
      setTotalEarnings((prevEarnings) => prevEarnings + reducedEarnings);

      try {
        // const response = await axios.post(
        //   `http://localhost:5000/api/account/${coachId}/earnings`,
        //   {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/account/${coachId}/earnings`,
            {
            sessionEarnings: reducedEarnings,
          }
        );
        setTotalEarnings(response.data.totalEarnings);
      } catch (error) {
        console.error("Error updating earnings on backend:", error);
      }

      deleteSession(sessionId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
      {/* Header with title, earnings, and refresh button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Sessions</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-lg border border-green-200">
            <FaPoundSign className="text-green-600 mr-2" />
            <span className="font-semibold text-gray-800">
              Total Earnings:{" "}
              <span className="text-green-600">
                £{totalEarnings.toFixed(2)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No sessions booked yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              onClick={() => handleCardClick(session)}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg truncate">
                    {session.userId?.username ?? "Unknown User"}
                  </h2>
                  <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                    £{session.servicePrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-grow">
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {session.serviceDescription}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaClock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{session.serviceDuration}</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {new Date(session.sessionDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  {session.meetingLink && (
                    <div className="mt-2">
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Join Meeting
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer with Delete Button */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSession(session._id, session.servicePrice);
                  }}
                  className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  <span>Complete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Session with{" "}
                {selectedSession.userId?.username ?? "Unknown User"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Service:</span>{" "}
                {selectedSession.serviceDescription}
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Link
                    </label>
                    <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://zoom.us/j/123456789"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending || emailSent}
                    className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                      isSending || emailSent
                        ? "bg-green-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isSending ? (
                      "Sending..."
                    ) : emailSent ? (
                      "Sent!"
                    ) : (
                      <>
                        <IoMdSend className="w-4 h-4" />
                        <span>Send Details</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
