// import { NavLink, Outlet } from "react-router-dom";

// export const AdminLayout = () => {
// return <>
// {/* <header>
//     <div>
//         <nav>
//             <ul>
//             <NavLink to="/admin/users">   <li>  users</li> </NavLink> 
//             <NavLink to="/admin/coachs">    <li>coachs</li> </NavLink>
//                 <li>Home</li>
//             </ul>
//         </nav>
//     </div>
// </header> */}
// <header className="bg-gray-800 shadow-lg p-4">
//   <div className="max-w-7xl mx-auto flex items-center justify-between">
//     <h1 className="text-white text-2xl font-bold animate-fade-in-left">Admin Panel</h1>

//     <nav>
//       <ul className="flex space-x-6 text-white text-md font-medium">
//         <NavLink
//           to="/admin/users"
//           className={({ isActive }) =>
//             `hover:text-blue-400 transition-all duration-200 ${
//               isActive ? 'text-blue-500 underline underline-offset-4' : ''
//             }`
//           }
//         >
//           <li className="cursor-pointer hover:scale-105 transition-transform">Users</li>
//         </NavLink>

//         <NavLink
//           to="/admin/coachs"
//           className={({ isActive }) =>
//             `hover:text-blue-400 transition-all duration-200 ${
//               isActive ? 'text-blue-500 underline underline-offset-4' : ''
//             }`
//           }
//         >
//           <li className="cursor-pointer hover:scale-105 transition-transform">Coachs</li>
//         </NavLink>

//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `hover:text-blue-400 transition-all duration-200 ${
//               isActive ? 'text-blue-500 underline underline-offset-4' : ''
//             }`
//           }
//         >
//           <li className="cursor-pointer hover:scale-105 transition-transform">Home</li>
//         </NavLink>

//          {/* ✅ New Blog Tab */}
//          <NavLink
//                 to="/admin/blogs"
//                 className={({ isActive }) =>
//                   `hover:text-blue-400 transition-all duration-200 ${
//                     isActive ? 'text-blue-500 underline underline-offset-4' : ''
//                   }`
//                 }
//               >
//                 <li className="cursor-pointer hover:scale-105 transition-transform">Blogs</li>
//               </NavLink>

//               <NavLink
//                 to="coachbooks"
//                 className={({ isActive }) =>
//                   `hover:text-blue-400 transition-all duration-200 ${
//                     isActive ? 'text-blue-500 underline underline-offset-4' : ''
//                   }`
//                 }
//               >
//                 <li className="cursor-pointer hover:scale-105 transition-transform"> Coach Books</li>
//               </NavLink>
//       </ul>
//     </nav>
//   </div>
// </header>


import { motion } from 'framer-motion';
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "Anshul@73859871s") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <form
          onSubmit={handlePasswordSubmit}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl w-[90%] max-w-md transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            🔒 Admin Access
          </h2>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg shadow-md"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <header className="bg-gray-800 shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold animate-fade-in-left">
            Admin Panel
          </h1>
          <nav>
            <ul className="flex space-x-6 text-white text-md font-medium">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition-all duration-200 ${
                    isActive ? "text-blue-500 underline underline-offset-4" : ""
                  }`
                }
              >
                <li className="cursor-pointer hover:scale-105 transition-transform">
                  Users
                </li>
              </NavLink>

              <NavLink
                to="/admin/coachs"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition-all duration-200 ${
                    isActive ? "text-blue-500 underline underline-offset-4" : ""
                  }`
                }
              >
                <li className="cursor-pointer hover:scale-105 transition-transform">
                  Coachs
                </li>
              </NavLink>

              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition-all duration-200 ${
                    isActive ? "text-blue-500 underline underline-offset-4" : ""
                  }`
                }
              >
                <li className="cursor-pointer hover:scale-105 transition-transform">
                  Blogs
                </li>
              </NavLink>

              <NavLink
                to="coachbooks"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition-all duration-200 ${
                    isActive ? "text-blue-500 underline underline-offset-4" : ""
                  }`
                }
              >
                <li className="cursor-pointer hover:scale-105 transition-transform">
                  Coach Books
                </li>
              </NavLink>

              <NavLink
                to="adminregister"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition-all duration-200 ${
                    isActive ? "text-blue-500 underline underline-offset-4" : ""
                  }`
                }
              >
                <li className="cursor-pointer hover:scale-105 transition-transform">
                  Admin register
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>

      <Outlet />
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* <motion.img
          src={Anshul}
          alt="Admin"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        /> */}
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="text-gray-500 mt-2">Glad to see you back 🚀</p>
      </motion.div>
    </div>
    </>
  );
};