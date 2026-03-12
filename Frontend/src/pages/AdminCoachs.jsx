

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CoachDetails } from "../components/CoachDetails";
import { useSelector } from "react-redux";

export const AdminCoachs = () => {
  const [coachData, setCoachData] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const [servicesEdit, setServicesEdit] = useState([]);
  const coachToken = useSelector((state) => state.coach?.token);
  const effectiveToken = token || coachToken || null;
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

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

  useEffect(() => {
    if (!selectedCoach) return;
    const load = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${selectedCoach._id}`
        );
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        } else {
          setReviews([]);
        }
      } catch {
        setReviews([]);
      }
    };
    load();
    const loadSessions = async () => {
      setSessionsLoading(true);
      try {
        const r = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/session/${selectedCoach._id}`
        );
        if (r.ok) {
          const d = await r.json();
          setSessions(Array.isArray(d) ? d : []);
        } else {
          setSessions([]);
        }
      } catch {
        setSessions([]);
      } finally {
        setSessionsLoading(false);
      }
    };
    loadSessions();
    setEditData({
      name: selectedCoach.name || "",
      email: selectedCoach.email || "",
      coachType: selectedCoach.coachType || "",
      country: selectedCoach.country || "",
      experience: selectedCoach.experience || "",
      qualifications: selectedCoach.qualifications || "",
      languages:
        Array.isArray(selectedCoach.languages)
          ? selectedCoach.languages.join(", ")
          : selectedCoach.languages || "",
      specialization: selectedCoach.specialization || "",
      availability: selectedCoach.availability || "",
      hourlyRate:
        selectedCoach.hourlyRate !== undefined && selectedCoach.hourlyRate !== null
          ? String(selectedCoach.hourlyRate)
          : "",
      phoneNumber: selectedCoach.phoneNumber || "",
      bio: selectedCoach.bio || "",
      address: selectedCoach.address || "",
      city: selectedCoach.city || "",
      state: selectedCoach.state || "",
      zipCode: selectedCoach.zipCode || "",
      socialMediaLinks:
        Array.isArray(selectedCoach.socialMediaLinks)
          ? selectedCoach.socialMediaLinks.join(", ")
          : selectedCoach.socialMediaLinks || "",
      certifications:
        Array.isArray(selectedCoach.certifications)
          ? selectedCoach.certifications.join(", ")
          : selectedCoach.certifications || "",
      website: selectedCoach.website || "",
      additionalNotes: selectedCoach.additionalNotes || "",
      featured: !!selectedCoach.featured,
    });
    setServicesEdit(
      Array.isArray(selectedCoach.services)
        ? selectedCoach.services.map((s) => ({
            duration: s.duration || "",
            price: s.price || "",
            description: s.description || "",
            _id: s._id || undefined,
          }))
        : []
    );
  }, [selectedCoach]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  const handleEditFile = (e) => {
    const file = e.target.files?.[0];
    setEditData((p) => ({ ...p, profilePicture: file }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCoach) return;
    try {
      const form = new FormData();
      Object.entries(editData || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null) form.append(k, v);
      });
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/coachs/${selectedCoach._id}`,
        {
          method: "PUT",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-Admin-UI-Password": import.meta.env.VITE_ADMIN_UI_PASSWORD || "",
          },
          body: form,
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSelectedCoach(data.coach);
        setShowEdit(false);
        toast.success("Coach updated");
        getCoachsdata();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const addServiceRow = () => {
    setServicesEdit((prev) => [...prev, { duration: "", price: "", description: "" }]);
  };
  const updateServiceField = (i, field, value) => {
    setServicesEdit((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };
  const removeServiceRow = (i) => {
    setServicesEdit((prev) => prev.filter((_, idx) => idx !== i));
  };
  const saveServices = async () => {
    if (!selectedCoach) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/coachs/${selectedCoach._id}/services`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-Admin-UI-Password": import.meta.env.VITE_ADMIN_UI_PASSWORD || "",
          },
          body: JSON.stringify({ services: servicesEdit }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSelectedCoach(data.coach);
        toast.success("Services updated");
      } else {
        toast.error(data.message || "Failed to update services");
      }
    } catch {
      toast.error("Failed to update services");
    }
  };

  const updateSessionField = (i, field, value) => {
    setSessions((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  };

  const saveSession = async (i) => {
    const s = sessions[i];
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/sessions/${s._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-Admin-UI-Password": import.meta.env.VITE_ADMIN_UI_PASSWORD || "",
          },
          body: JSON.stringify({
            coachId: selectedCoach._id,
            userId: s.userId?._id || s.userId,
            sessionDate: s.sessionDate,
            serviceDuration: s.serviceDuration,
            servicePrice: s.servicePrice,
            serviceDescription: s.serviceDescription,
            meetingLink: s.meetingLink || "",
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSessions((prev) =>
          prev.map((it) => (it._id === s._id ? data.session : it))
        );
        toast.success("Session updated");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Delete this session?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/session/${selectedCoach._id}/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        setSessions((prev) => prev.filter((s) => s._id !== id));
        toast.success("Session deleted");
      } else {
        const d = await res.json();
        toast.error(d.message || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      const headers = effectiveToken
        ? { Authorization: `Bearer ${effectiveToken}` }
        : undefined;
      let res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/reviews/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (!res.ok && (res.status === 401 || res.status === 403 || res.status === 404)) {
        // fallback to public reviews route if needed
        res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/ratings/${id}`,
          {
            method: "DELETE",
            headers,
          }
        );
      }
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        toast.success("Review deleted");
      } else {
        const d = await res.json().catch(() => ({}));
        toast.error(d.message || `Delete failed (${res.status})`);
      }
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const filteredCoaches = coachData.filter((coach) =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCoach) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedCoach(null)}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Back to Coaches
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEdit(true)}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
            >
              Edit Coach
            </button>
          </div>
        </div>

        {showEdit && editData && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Name"
              />
              <input
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Email"
              />
              <input
                name="coachType"
                value={editData.coachType}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Coach Type"
              />
              <input
                name="country"
                value={editData.country}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Country"
              />
              <input
                name="experience"
                value={editData.experience}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Experience"
              />
              <input
                name="qualifications"
                value={editData.qualifications}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Qualifications"
              />
              <input
                name="languages"
                value={editData.languages}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Languages (comma-separated)"
              />
              <input
                name="specialization"
                value={editData.specialization}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Specialization"
              />
              <input
                name="availability"
                value={editData.availability}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Availability"
              />
              <input
                name="hourlyRate"
                value={editData.hourlyRate}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Hourly Rate"
              />
              <input
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Phone"
              />
              <input
                name="address"
                value={editData.address}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Address"
              />
              <input
                name="city"
                value={editData.city}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="City"
              />
              <input
                name="state"
                value={editData.state}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="State"
              />
              <input
                name="zipCode"
                value={editData.zipCode}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Zip Code"
              />
              <input
                type="file"
                onChange={handleEditFile}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editData.featured}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, featured: e.target.checked }))
                  }
                />
                Featured
              </label>
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700 md:col-span-2"
                rows={4}
                placeholder="Bio"
              />
              <input
                name="socialMediaLinks"
                value={editData.socialMediaLinks}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700 md:col-span-2"
                placeholder="Social Media Links (comma-separated)"
              />
              <input
                name="certifications"
                value={editData.certifications}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700 md:col-span-2"
                placeholder="Certifications (comma-separated)"
              />
              <input
                name="website"
                value={editData.website}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                placeholder="Website"
              />
              <textarea
                name="additionalNotes"
                value={editData.additionalNotes}
                onChange={handleEditChange}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-700 md:col-span-2"
                rows={3}
                placeholder="Additional Notes"
              />
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        <CoachDetails coach={selectedCoach} onBack={() => setSelectedCoach(null)} />

        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold mb-3">Sessions</h3>
          {sessionsLoading ? (
            <p className="text-gray-400">Loading sessions…</p>
          ) : sessions.length === 0 ? (
            <p className="text-gray-400">No sessions</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((s, i) => (
                <div
                  key={s._id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center bg-gray-900 p-3 rounded"
                >
                  <input
                    value={s.serviceDescription}
                    onChange={(e) =>
                      updateSessionField(i, "serviceDescription", e.target.value)
                    }
                    className="px-2 py-2 rounded bg-gray-950 border border-gray-700"
                    placeholder="Description"
                  />
                  <input
                    value={s.serviceDuration}
                    onChange={(e) =>
                      updateSessionField(i, "serviceDuration", e.target.value)
                    }
                    className="px-2 py-2 rounded bg-gray-950 border border-gray-700"
                    placeholder="Duration"
                  />
                  <input
                    value={s.servicePrice}
                    onChange={(e) =>
                      updateSessionField(i, "servicePrice", e.target.value)
                    }
                    className="px-2 py-2 rounded bg-gray-950 border border-gray-700"
                    placeholder="Price"
                  />
                  <input
                    value={
                      s.sessionDate
                        ? new Date(s.sessionDate).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      updateSessionField(i, "sessionDate", e.target.value)
                    }
                    type="datetime-local"
                    className="px-2 py-2 rounded bg-gray-950 border border-gray-700"
                  />
                  <input
                    value={s.meetingLink || ""}
                    onChange={(e) =>
                      updateSessionField(i, "meetingLink", e.target.value)
                    }
                    className="px-2 py-2 rounded bg-gray-950 border border-gray-700"
                    placeholder="Meeting link"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveSession(i)}
                      className="px-3 py-2 rounded bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => deleteSession(s._id)}
                      className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <div className="space-y-3">
            {servicesEdit.map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                <input
                  value={s.duration}
                  onChange={(e) => updateServiceField(i, "duration", e.target.value)}
                  className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                  placeholder="Duration"
                />
                <input
                  value={s.price}
                  onChange={(e) => updateServiceField(i, "price", e.target.value)}
                  className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                  placeholder="Price"
                />
                <input
                  value={s.description}
                  onChange={(e) => updateServiceField(i, "description", e.target.value)}
                  className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
                  placeholder="Description"
                />
                <button
                  onClick={() => removeServiceRow(i)}
                  className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={addServiceRow} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
                Add Service
              </button>
              <button onClick={saveServices} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">
                Save Services
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Reviews</h3>
            {reviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews((v) => !v)}
                className="text-blue-400"
              >
                {showAllReviews ? "View Less" : "View More"}
              </button>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews</p>
          ) : (
            <div className="space-y-3">
              {(showAllReviews ? reviews : reviews.slice(0, 3)).map((r) => (
                <div key={r._id} className="flex items-start justify-between bg-gray-900 p-3 rounded">
                  <div>
                    <p className="text-sm">{r.user?.username || r.user?.email || "User"}</p>
                    <p className="text-gray-300 text-sm">{r.reviewText}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(r._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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
