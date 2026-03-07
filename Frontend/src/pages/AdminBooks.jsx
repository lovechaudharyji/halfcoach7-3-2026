import { useEffect, useState } from "react";
import axios from "axios";

export const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchBooks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/books`);
    setBooks(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`);
    fetchBooks();
  };

  const handleDownload = (id) => {
    window.open(
      `${import.meta.env.VITE_BASE_URL}/api/books/download/${id}`,
      "_blank"
    );
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0F172A]">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Uploaded Coachs Books
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search books by name..."
          className="px-4 py-2 border-none rounded-xl w-full max-w-md bg-[#1E293B] text-white placeholder-gray-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {displayedBooks.length === 0 ? (
        <p className="text-center text-gray-400">No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-[#1E293B] text-white rounded-xl shadow-md p-3 hover:shadow-xl transition max-w-sm mx-auto"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/api/books/image/${
                    book._id
                  }`}
                  alt={book.name}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold">{book.name}</h2>
                <p className="text-gray-300 text-sm mt-1">{book.description}</p>
                <p className="text-green-400 font-medium mt-2">{book.price}</p>
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleDownload(book._id)}
                    className="bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-800 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4 text-white">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

