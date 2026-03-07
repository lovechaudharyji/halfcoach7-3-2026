import { useEffect, useState } from "react";
// import logo2 from "../assets/images/216925396.png";
import logo2 from "../assets/images/bggray.jpg"

import axios from "axios";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // const fetchBlogs = async () => {
  //   const res = await axios.get("http://localhost:5000/api/blogs");
  //   setBlogs(res.data);
  // };
  const fetchBlogs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`);
    setBlogs(res.data);
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section
      className="pt-0" // Ensures no top padding
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // Changed from 'center' to 'top'
        marginTop: "-4rem", // Optional: adjust if parent layout gives spacing
      }}
    >
      {/* Inline custom animation keyframes */}
      <style>{`
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`}</style>

<div className="max-w-4xl mx-auto mt-12 px-4">
  <h2 className="text-3xl font-bold text-center text-white mb-10">📝 Discover Coaches, Join Events, Unlock Growth — Only on HalfCoach.</h2>

  <div className="space-y-8">
    {blogs.map((blog, index) => (
      <div
        key={blog._id}
        className="group bg-gray-700 p-6 rounded-2xl border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        style={{
          opacity: 0,
          animation: `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
        }}
      >
        {/* Header: Author and Date */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <span>✍️ {blog.author || "Halfcoach"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-yellow-400 group-hover:text-indigo-300 transition-colors duration-200 mb-2">
          {blog.title}
        </h3>

        {/* Blog Excerpt */}
        <p className="text-gray-200 mb-4 line-clamp-3">
          {blog.content.length > 200
            ? blog.content.slice(0, 200) + "..."
            : blog.content}
        </p>

      </div>
    ))}
  </div>
</div>

    </section>
  
  


  );
};


