
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency:"gbp",
            product_data: {
              name: `Session: ${serviceDescription}`,
            },
            unit_amount: servicePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
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
    res.status(500).json({ message: "Stripe session creation failed" });
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