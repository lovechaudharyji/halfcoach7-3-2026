import  { useEffect, useState } from "react";
import { setData, getData, removeData } from "../utils/cookieHelper";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user session from cookies/localStorage
    const storedUser = getData("userSession");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = () => {
    const userData = { id: 1, name: "John Doe", token: "abc123" };
    setData("userSession", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    removeData("userSession");
    setUser(null);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Cookie & Local Storage Example</h1>
      {user ? (
        <>
          <p className="text-green-600 mt-2">Welcome, {user.name}!</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default App;
