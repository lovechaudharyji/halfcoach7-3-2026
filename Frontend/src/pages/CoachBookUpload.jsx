
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiUpload, FiTrash2, FiDownload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

export const CoachBookUpload = () => {
  const coachId = useSelector((state) => state.coach.coach.coachId);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    pdf: null,
    image: null,
  });

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coachId) {
      setError("Coach ID not found. Please log in again.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("pdf", formData.pdf);
    data.append("image", formData.image);
    data.append("coachId", coachId);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/books`, data);
      setFormData({
        name: "",
        description: "",
        price: "",
        pdf: null,
        image: null,
      });
      setSuccess("Book uploaded successfully!");
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchBooks = async () => {
    if (!coachId) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/books/${coachId}`
      );
      setBooks(res.data.books || []);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Failed to load books. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`);
      setSuccess("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      setError("Failed to delete book. Please try again.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [coachId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Upload a New Book
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter book name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <textarea
              name="description"
              maxLength={30}
              placeholder="Enter book author"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (£)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <FiUpload className="w-8 h-8 text-gray-500 mb-2" />
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.pdf ? formData.pdf.name : "Upload PDF File"}
                </span>
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
                <span className="text-xs text-gray-500">
                  PDF only (max 10MB)
                </span>
              </label>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <FiUpload className="w-8 h-8 text-gray-500 mb-2" />
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.image ? formData.image.name : "Upload Cover Image"}
                </span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
                <span className="text-xs text-gray-500">
                  JPG, PNG (max 5MB)
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white ${
              uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition duration-200`}
          >
            {uploading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Upload Book"
            )}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Your Uploaded Books
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-blue-500 text-2xl" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/api/books/image/${
                      book._id
                    }`}
                    alt={book.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">
                    {book.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {book.description}
                  </p>
                  <p className="text-green-600 font-semibold mb-3">
                    £{parseFloat(book.price).toFixed(2)}
                  </p>
                  <div className="flex justify-between items-center">
                    <a
                      href={`${
                        import.meta.env.VITE_BASE_URL
                      }/api/books/download/${book._id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                    >
                      <FiDownload className="mr-1" /> Download
                    </a>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {books.length === 0 && !loading && (
              <div className="col-span-full py-8 text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <p className="text-gray-500">No books uploaded yet.</p>
                <p className="text-gray-400 text-sm mt-1">
                  Upload your first book using the form above
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};