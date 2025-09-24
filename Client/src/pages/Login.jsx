import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard");
      }
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-gray-200 px-5">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <h2 className="text-3xl font-bold text-white">Login</h2>

        <input
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
        <hr className="w-full border-gray-700" />

        <div className="flex justify-between items-center w-full text-sm text-gray-400">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="text-green-400 hover:text-green-300 font-medium cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
