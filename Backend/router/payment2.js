// backend/routes/payment.js

const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 // Replace with your real secret key

router.post("/create-checkout-session", async (req, res) => {
    console.log("POST /api/payment/create-checkout-session hit ✅");

  const {
    coachId,
    userId,
    serviceDuration,
    servicePrice,
    serviceDescription,
    userEmail,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency:"gbp",
            product_data: {
              name: `${serviceDuration} Coaching Session`,
              description: serviceDescription,
            },
            unit_amount: servicePrice * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&coachId=${coachId}&userId=${userId}&duration=${serviceDuration}&price=${servicePrice}&desc=${encodeURIComponent(
        serviceDescription
      )}`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/payment-failure`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
