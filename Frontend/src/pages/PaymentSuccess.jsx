import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-green-600 text-2xl font-bold">✅ Payment Done</h1>
      <p>Redirecting to Home...</p>
    </div>
  );
};


