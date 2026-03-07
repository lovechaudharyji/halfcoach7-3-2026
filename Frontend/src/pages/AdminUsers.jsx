import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

const getAllUsersData = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
        // const response = await fetch("http://localhost:5000/api/auth/users", {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/auth/users`,
            {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(`users ${data}`);
        setUsers(data);
    } catch (error) {
       console.log(error);
        
    }
};

const deleteUser = async (id) => {

    try {
        
    

    // const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/users/delete/${id}`,
        {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    });

    const data = await response.json();
        console.log(`users after deleted: ${data}`);

if (response.ok) {
    getAllUsersData();
}

    } catch (error) {
        console.log(error);
    }
};

    useEffect(() => { 
        getAllUsersData ();
    }, []);

    return (
    <>

<section className="p-6 bg-gray-900 min-h-screen">
  <div className="mb-6 text-center">
    <h1 className="text-3xl font-bold text-white animate-fade-in-down">Admin User Data</h1>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg animate-fade-in-up">
      <thead>
        <tr className="bg-gray-700 text-sm text-gray-300">
          <th className="px-6 py-4 text-left">Name</th>
          <th className="px-6 py-4 text-left">Email</th>
          <th className="px-6 py-4 text-left">Phone</th>
          <th className="px-6 py-4 text-left">Update</th>
          <th className="px-6 py-4 text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((curUser, index) => (
          <tr
            key={index}
            className="hover:bg-gray-700 transition-all duration-200 border-b border-gray-700"
          >
            <td className="px-6 py-4">{curUser.username}</td>
            <td className="px-6 py-4">{curUser.email}</td>
            <td className="px-6 py-4">{curUser.phone}</td>
            <td className="px-6 py-4">
              <Link
                to={`/admin/users/${curUser._id}/edit`}
                className="text-blue-400 hover:text-blue-200 transition"
              >
                ✏️ Edit
              </Link>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => deleteUser(curUser._id)}
                className="text-red-400 hover:text-red-200 transition"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

    </>
    );
};