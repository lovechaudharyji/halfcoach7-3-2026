import  { useEffect, useState } from "react";
import axios from "axios";

export const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  // const fetchBlogs = async () => {
  //   const res = await axios.get("http://localhost:5000/api/blogs");
  //   setBlogs(res.data);
  // };
  const fetchBlogs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`);
    setBlogs(res.data);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.post("http://localhost:5000/api/blogs", form);
  //   setForm({ title: "", content: "" });
  //   fetchBlogs();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/blogs`, form);
    setForm({ title: "", content: "" });
    fetchBlogs();
  };


  // const handleDelete = async (id) => {
  //   if (window.confirm("Delete this blog?")) {
  //     await axios.delete(`http://localhost:5000/api/blogs/${id}`);
  //     fetchBlogs();
  //   }
  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Admin Panel — Manage Blog Posts</h1>
  
      {/* Create Blog Form */}
      <form onSubmit={handleSubmit} className="bg-[#1e293b] shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Create a New Blog</h2>
  
        <input
          className="w-full bg-[#0f172a] border border-gray-600 text-white rounded-lg p-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full bg-[#0f172a] border border-gray-600 text-white rounded-lg p-3 mb-4 h-32 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
  
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
        >
          ➕ Create Blog
        </button>
      </form>
  
      {/* Blog List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
  
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#1e293b] border border-gray-700 rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
            <p className="text-gray-300">{blog.content}</p>
            <button
              onClick={() => handleDelete(blog._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  

  );
};


