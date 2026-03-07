import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-red-600 text-2xl font-bold">❌ Payment Unsuccess</h1>
      <p>Redirecting to Home...</p>
    </div>
  );
};

