import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
