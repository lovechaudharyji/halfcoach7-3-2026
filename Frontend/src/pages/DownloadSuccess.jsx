
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const DownloadSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const bookId = query.get('bookId');

  useEffect(() => {
    if (bookId) {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/api/books/download/${bookId}`;
    }
  }, [bookId]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold">Payment Successful!</h2>
      <p>Starting your download...</p>
    </div>
  );
};


