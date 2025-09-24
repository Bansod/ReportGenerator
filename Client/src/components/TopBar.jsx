import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const checkLogin = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  checkLogin();

  window.addEventListener("storage", checkLogin);
  return () => window.removeEventListener("storage", checkLogin);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
        Watch Your Health 
      </h1>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/generate-report"
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
            >
              Generate PDF
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
