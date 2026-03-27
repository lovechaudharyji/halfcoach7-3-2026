
const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const {
    coachId,
    userId,
    serviceDuration,
    servicePrice,
    serviceDescription,
    userEmail,
    successUrl,
    cancelUrl,
  } = req.body;

  try {
    const priceNumber = Number(servicePrice);
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      return res.status(400).json({ message: "Invalid service price" });
    }
    const toPence = Math.round(priceNumber * 100);
    const okUrl = (u) =>
      typeof u === "string" && /^https?:\/\//i.test(u) ? u : null;
    const success = okUrl(successUrl) || process.env.FRONTEND_BASE_URL;
    const cancel = okUrl(cancelUrl) || process.env.FRONTEND_BASE_URL;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency:"gbp",
            product_data: {
              name: `Session: ${serviceDescription}`,
            },
            unit_amount: toPence,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      success_url: success,
      cancel_url: cancel,
      metadata: {
        coachId,
        userId,
        serviceDuration,
        servicePrice,
        serviceDescription,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: err?.message || "Stripe session creation failed" });
  }
});

// Create a new session
router.post("/create", sessionController.createSession);
router.post("/updatemeeting", sessionController.updateMeetingLink);

// Get all sessions of a coach
router.get("/:coachId", sessionController.getCoachSessions);

// Get all sessions of a user
router.get("/user/:userId", sessionController.getUserSessions);

// Delete a session
router.delete("/:coachId/:sessionId", sessionController.deleteSession);

module.exports = router;
