import { useState } from "react";

export default function ReportGenerator() {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");

  const handleGenerate = async () => {
    if (!sessionId) {
      setMessage("Please enter a session ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setPdfBlobUrl("");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/api/report/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage(error.error || "Error generating report");
        return;
      }

      // Convert response to Blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
      setMessage("Report generated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-900">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 w-80">
        <h2 className="text-2xl font-bold text-white">Generate Report</h2>
        <input
          className="w-full p-2 rounded border border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <button
          className={`w-full px-4 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-500 transition cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate PDF"}
        </button>

        {message && <p className="text-center text-gray-300">{message}</p>}

        {pdfBlobUrl && (
          <a
            href={pdfBlobUrl}
            download={`${sessionId}.pdf`}
            className="w-full text-center px-4 py-2 rounded font-semibold text-white bg-green-600 hover:bg-green-500 transition"
          >
            Download Report
          </a>
        )}
      </div>
    </div>
  );
}
