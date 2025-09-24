import { useState } from "react";

export default function ReportGenerator() {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!sessionId) {
      setMessage("Please enter a session ID");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/api/report/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const blob = await res.blob();

      if (blob.type === "application/json") {
        const data = await blob.text();
        setMessage(JSON.parse(data).message || "Error generating report");
      } else {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${sessionId}_report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setMessage("Report generated successfully!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
      <input
        className="border p-2 mb-2 w-64"
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate PDF"}
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
}
