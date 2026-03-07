

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CoachDetails } from "../components/CoachDetails";

export const AdminCoachs = () => {
  const [coachData, setCoachData] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getCoachsdata = async () => {
    try {
      // const response = await fetch("http://localhost:5000/api/coach/coaches");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/coach/coaches`
      );
      const data = await response.json();
      if (response.ok) {
        setCoachData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/api/admin/coachs/delete/${id}`,
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/coachs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        getCoachsdata();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Not Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFeaturedCoach = async (coachId, currentStatus) => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/api/coach/${coachId}/feature`,
      //   {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/coach/${coachId}/feature`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ featured: !currentStatus }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getCoachsdata(); // refresh list
      } else {
        toast.error("Failed to update featured status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCoachsdata();
  }, []);

  const filteredCoaches = coachData.filter((coach) =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCoach) {
    return (
      <CoachDetails
        coach={selectedCoach}
        onBack={() => setSelectedCoach(null)}
      />
    );
  }

  return (
    <section className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 text-center animate-fade-in-down">
        Admin Coaches Panel
      </h1>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by coach name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* 🔽 Coach Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.length > 0 ? (
          filteredCoaches.map((coach) => (
            <div
              key={coach._id}
              onClick={() => setSelectedCoach(coach)}
              className="bg-gray-800 cursor-pointer rounded-2xl shadow-xl p-5 text-white hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img
                // src={`http://localhost:5000${coach.profilePicture}`}
                src={`${import.meta.env.VITE_BASE_URL}${coach.profilePicture}`}

                alt="Profile"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <p className="text-xl font-semibold mb-1">👤 {coach.name}</p>
              <p className="text-sm text-gray-300 mb-1">📧 {coach.email}</p>
              <p className="text-sm text-gray-300 mb-1">🎯 {coach.coachType}</p>
              <p className="text-sm text-gray-300 mb-1">🌍 {coach.country}</p>
              <p className="text-sm text-gray-300 mb-1">
                🗣️ Languages: {coach.languages?.join(", ") || "N/A"}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                💼 Services: {coach.services?.length || 0} | 📅 Sessions:{" "}
                {coach.sessions?.length || 0}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeaturedCoach(coach._id, coach.featured);
                }}
                className={`${
                  coach.featured
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-600 hover:bg-green-700"
                } transition-all px-4 py-2 mt-2 mr-2 rounded-md text-white font-medium shadow hover:shadow-lg`}
              >
                {coach.featured ? "⭐ Unfeature" : "🌟 Feature"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteContactById(coach._id);
                }}
                className="bg-red-600 hover:bg-red-700 transition-all px-4 py-2 mt-2 rounded-md text-white font-medium shadow hover:shadow-lg"
              >
                ❌ Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No coaches found
          </p>
        )}
      </div>
    </section>
  );
};