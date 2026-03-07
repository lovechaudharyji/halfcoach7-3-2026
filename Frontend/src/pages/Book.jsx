import { useEffect, useState } from "react";
import axios from "axios";

export const Book = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const fetchBooks = async () => {
    // const res = await axios.get("http://localhost:5000/api/books");
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/books`);

    setBooks(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`);
    fetchBooks();
  };

  // const handleDownload = (id) => {
  //   window.open(`http://localhost:5000/api/books/download/${id}`, "_blank");
  // };
  const handleDownload = async (bookId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/books/checkout-session/${bookId}`);
      window.location.href = res.data.url;
    } catch (err) {
      alert('Payment session failed');
    }
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
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Uploaded Books</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search books by name..."
          className="px-4 py-2 border rounded-xl w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />
      </div>

      {displayedBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <>
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {books.map(book => (
          <div key={book._id} className="bg-gray-100 p-3 rounded-md shadow-sm text-sm w-85">
            <img src={`${import.meta.env.VITE_BASE_URL}/api/books/image/${book._id}`} alt={book.name} className="w-80 h-36 object-cover rounded mb-2" />
            <h4 className="text-base font-bold text-center mb-1">{book.name}</h4>
            <p className="text-gray-700 text-sm">{book.description}</p>
            <p className="text-green-600 font-semibold mb-2 text-lg">Price £{book.price}</p>
            <div className="flex space-x-4">
              {/* <a href={`http://localhost:5000/api/books/download/${book._id}`} className="text-blue-600 hover:underline">Download</a> 
              <button onClick={() => handleDownload(book._id)}className="text-blue-600 hover:underline">Download </button>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  {books.map(book => (
    <div
      key={book._id}
      className="flex flex-col items-center text-center bg-white shadow rounded-md p-3 w-[250px] mx-auto"
    >
      <img
        src={`${import.meta.env.VITE_BASE_URL}/api/books/image/${book._id}`}
        alt={book.name}
        className="w-full h-52 object-cover rounded mb-2"
      />
      <h4 className="text-[15px] font-medium text-blue-800 leading-tight">{book.name}</h4>
      <p className="text-sm text-gray-600 mt-1 flex justify-end">
                        - {book.description}
                      </p>
      {/* <p className="text-green-600 font-semibold text-sm mb-2">£{book.price}</p> */}
      <p className="text-green-600 font-semibold text-sm mb-2">
  £{(book.price * 1.10).toFixed(2)}
</p>
      <button
        onClick={() => handleDownload(book._id)}
        className="text-blue-600 hover:underline text-xs"
      >
        Download
      </button>
    </div>
  ))}
</div>


          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};


