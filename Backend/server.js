require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();





const authRouter = require("./router/auth-router");
const coachRouter = require("./router/coach-router.js");
const paymentRouter = require("./router/payment.js");
const sessionRouter = require("./router/session-router.js");
const emailRouter = require("./router/email-router.js");
const bookingRouter = require("./router/booking-router.js");
const accountDetail = require("./router/account-routes.js");
const adminRoute = require("./router/admin-router.js");
const blogRoutes = require("./router/blogRoutes");
const paymentRoutes = require("./router/payment2.js");
const bookingRoutes = require("./router/Booking.js");
const books = require("./router/bookRouter.js");
const reviewRoutes = require("./router/reviewRoutes");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// CORS Configuration
// const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
// };


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://halfcoach.com",
    "https://halfcoach.com",
    "http://www.halfcoach.com",
    "https://www.halfcoach.com",
  ],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Admin-UI-Password",
  ],
};





app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/coach", coachRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/session", sessionRouter);
app.use("/api/email", emailRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/account", accountDetail);
app.use("/api/reviews", reviewRoutes);

//let's define admin
app.use("/api/admin", adminRoute);
app.use("/api/blogs", blogRoutes);
app.use("/api/payment", paymentRouter); // Use the paymentRouter
app.use("/api/payment", paymentRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/books", books);





app.post("/create-checkoutt-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "One-time Payment",
            },
            unit_amount: 5000, // 50 GBP in pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_BASE_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/payment-failure`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-donation-session", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Donation to HalfCoach`,
            },
            unit_amount: amount * 100, // Stripe expects pence
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_BASE_URL}/?success=true`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/?payment-failure`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Donation Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
