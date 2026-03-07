
import  { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51R8pnXP1dQNcnYxHtOq7Kx3KjU6XTJUq3Ep2Br9bOuS1Ixi55ZfIK7BKgYsBIbvWsjkQ1D6b8f0DfmGKELExTWNC00mNukAF06');
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle success/failure when redirected back from Stripe
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      alert('✅ Payment Done');
      navigate('/payment-success');
    } else if (query.get('canceled')) {
      alert('❌ Payment Unsuccessful');
      navigate('/payment-failure');
    }
  }, [location, navigate]);

  const handleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-checkoutt-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    // <div className="text-center mt-20">
    //   <button
    //     onClick={handleClick}
    //     className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    //   >
    //     Pay £50
    //   </button>
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
  Feature Yourself on HalfCoach
  </h1>
  <h5 className="text-4xl md:text-2xl font-bold text-gray-800 mb-4">
  Stand out from the crowd and attract more clients
  </h5>
  <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
  For just <span className="font-semibold text-blue-600">£50</span> your profile will be prominently featured on our homepage for a full 30 days, giving you maximum visibility to potential clients. We ll also boost your profile across our social media platforms to reach an even wider audience.
  </p>
  <button
    onClick={handleClick}
    className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
  >
    Pay £50
  </button>
</div>

  );
};

 
