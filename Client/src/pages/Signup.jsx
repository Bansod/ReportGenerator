import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        // Redirect to login after successful signup
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-gray-200 px-5">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <h2 className="text-3xl font-bold text-white">Signup</h2>

        <input
          className="bg-gray-700 text-white border border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="bg-gray-700 text-white border border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg w-full transition"
          onClick={handleSignup}
        >
          Signup
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}

        <hr className="w-full border-gray-700" />

        <div className="flex justify-between items-center w-full text-sm text-gray-400">
          <span>Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
