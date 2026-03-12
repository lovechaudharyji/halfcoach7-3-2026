const Coach = require("../models/coach-model");
const path = require("path");
const fs = require("fs");

const updateCoachByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      coachType,
      country,
      experience,
      qualifications,
      languages,
      specialization,
      availability,
      hourlyRate,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      socialMediaLinks,
      certifications,
      bio,
      website,
      additionalNotes,
      featured,
    } = req.body;

    let profilePictureUrl = "";
    if (req.file) {
      profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    const existingCoach = await Coach.findById(id);
    if (!existingCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    if (email && email !== existingCoach.email) {
      const dup = await Coach.findOne({ email });
      if (dup) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    if (profilePictureUrl && existingCoach.profilePicture) {
      const oldPath = path.join(__dirname, "..", existingCoach.profilePicture);
      fs.unlink(oldPath, () => {});
    }

    const normalizeArray = (v) => {
      if (Array.isArray(v)) return v;
      if (typeof v === "string") {
        return v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return undefined;
    };

    const update = {
      name,
      email,
      coachType,
      country,
      experience,
      qualifications,
      languages: normalizeArray(languages),
      specialization,
      availability,
      hourlyRate: typeof hourlyRate === "string" ? Number(hourlyRate) : hourlyRate,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      socialMediaLinks: normalizeArray(socialMediaLinks),
      certifications: normalizeArray(certifications),
      bio,
      website,
      additionalNotes,
    };

    if (typeof featured !== "undefined") {
      update.featured = featured === "true" || featured === true;
    }

    if (profilePictureUrl) {
      update.profilePicture = profilePictureUrl;
    }

    const updated = await Coach.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json({ message: "Coach updated successfully", coach: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateServicesByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({ message: "services must be an array" });
    }

    const normalized = services.map((s) => ({
      duration: s.duration,
      price: Number(s.price),
      description: s.description || "",
    }));

    const updated = await Coach.findByIdAndUpdate(
      id,
      { services: normalized },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Coach not found" });
    }
    return res
      .status(200)
      .json({ message: "Services updated successfully", coach: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const setFeaturedByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { featured } = req.body;
    const updated = await Coach.findByIdAndUpdate(
      id,
      { featured: !!featured },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Coach not found" });
    }
    return res
      .status(200)
      .json({ message: "Featured flag updated", coach: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const Session = require("../models/Session");

const updateSessionByAdmin = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const {
      coachId,
      userId,
      sessionDate,
      serviceDuration,
      servicePrice,
      serviceDescription,
      meetingLink,
    } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const update = {};
    if (coachId && String(session.coachId) !== coachId) {
      const oldCoachId = String(session.coachId);
      await Coach.findByIdAndUpdate(oldCoachId, {
        $pull: { sessions: session._id },
      });
      const newCoach = await Coach.findByIdAndUpdate(
        coachId,
        { $addToSet: { sessions: session._id } },
        { new: true }
      );
      if (!newCoach) {
        return res.status(404).json({ message: "New coach not found" });
      }
      update.coachId = coachId;
    }

    if (userId) update.userId = userId;
    if (sessionDate) update.sessionDate = new Date(sessionDate);
    if (serviceDuration) update.serviceDuration = serviceDuration;
    if (typeof servicePrice !== "undefined")
      update.servicePrice =
        typeof servicePrice === "string" ? Number(servicePrice) : servicePrice;
    if (serviceDescription) update.serviceDescription = serviceDescription;
    if (typeof meetingLink !== "undefined") update.meetingLink = meetingLink;

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      update,
      { new: true, runValidators: true }
    )
      .populate("userId", "username email")
      .populate("coachId", "name email");

    return res
      .status(200)
      .json({ message: "Session updated successfully", session: updatedSession });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  updateCoachByAdmin,
  updateServicesByAdmin,
  setFeaturedByAdmin,
  updateSessionByAdmin,
};

