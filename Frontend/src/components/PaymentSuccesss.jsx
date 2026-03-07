
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const PaymentSuccesss = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const executedRef = useRef(false);

  const query = new URLSearchParams(location.search);

  const coachId = query.get("coachId");
  const userId = query.get("userId");
  const serviceDuration = query.get("duration");
  const servicePrice = query.get("price");
  const serviceDescription = query.get("desc");
  const coachName = query.get("coachName");
  const userName = query.get("userName");
  const coachEmail = query.get("coachEmail");
  const userEmail = query.get("userEmail");

  useEffect(() => {
    const createSessionAndNotify = async () => {
      if (executedRef.current) return; // prevent re-run
      executedRef.current = true;
      try {
        // 1. Create session
        // const sessionRes = await axios.post(
        //   "http://localhost:5000/api/session/create",
        //   {
          const sessionRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/session/create`,
            {
            coachId,
            userId,
            serviceDuration,
            servicePrice,
            serviceDescription,
          }
        );

        if (sessionRes.status === 201) {
          // 2. Notify coach via email
          // await axios.post("http://localhost:5000/api/booking/send", {
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/booking/send`,
              {
            to: coachEmail,
            subject: `${userName} has booked a session`,
            message: `${coachName},\n\n${userName} has successfully booked your session: "${serviceDescription}" on ${new Date().toLocaleDateString()}.\n\nPlease go to your dashboard to schedule the session.`,
          });

          alert("Payment successful! Session booked & coach notified.");
          navigate(`/coaches`);
        } else {
          alert("Payment succeeded, but failed to book session.");
        }
      } catch (err) {
        console.error("Error finalizing session:", err);
        alert("Something went wrong after payment. Please contact support.");
      }
    };

    if (coachId && userId) {
      createSessionAndNotify();
    }
  }, [coachId, userId, serviceDescription, servicePrice, coachEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700">
          We re finalizing your booking...
        </p>
      </div>
    </div>
  );
};



