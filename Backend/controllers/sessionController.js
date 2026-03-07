const Session = require("../models/Session");
const Coach = require("../models/coach-model");
const User = require("../models/user-model.js");

// Create a session
const createSession = async (req, res) => {
  const { coachId, userId, serviceDuration, servicePrice, serviceDescription } =
    req.body;

  try {
    // Check if coach exists
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create session with coachId and userId
    const session = new Session({
      userId,
      coachId, // Store coachId in session
      serviceDuration,
      servicePrice,
      serviceDescription,
    });

    // Save the session
    await session.save();

    // Optionally, if you need to link the session to the coach's sessions array
    // If coach should have a list of session references, you can push session
    coach.sessions.push(session._id); // Push the session reference (not the full session object)
    await coach.save();

    res.status(201).json({ message: "Session added successfully", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all sessions of a coach (by coachId)
const getCoachSessions = async (req, res) => {
  const { coachId } = req.params;

  try {
    // Query sessions where the coachId matches the given coachId
    const sessions = await Session.find({ coachId })
      .populate("userId", "username email") // Populate user details (username, email)
      .exec();

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for this coach" });
    }

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions of a user (by userId)
const getUserSessions = async (req, res) => {
  const { userId } = req.params;

  try {
    // Query sessions where the userId matches the given userId
    const sessions = await Session.find({ userId })
      .populate("coachId", "name email") // Populate coach details (name, email)
      .exec();

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for this user" });
    }

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  const { coachId, sessionId } = req.params;

  try {
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    const sessionIndex = coach.sessions.findIndex(
      (session) => session._id.toString() === sessionId
    );

    if (sessionIndex === -1) {
      return res.status(404).json({ message: "Session not found" });
    }

    coach.sessions.splice(sessionIndex, 1);
    await coach.save();

    await Session.findByIdAndDelete(sessionId); // Delete the session from the Session model

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateMeetingLink = async (req, res) => {
  const { sessionId, meetingLink } = req.body;

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { meetingLink },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    res
      .status(200)
      .json({ message: "Meeting link updated", session: updatedSession });
  } catch (error) {
   console.error("Error updating meeting link:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSession,
  getCoachSessions,
  getUserSessions,
  deleteSession,
  updateMeetingLink,
};