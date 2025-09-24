import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportGenerator from "./pages/ReportGenerator";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/TopBar";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <div className="h-[10vh]">
          <Topbar />
        </div>
        <div className="h-[90vh]">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generate-report"
              element={
                <ProtectedRoute>
                  <ReportGenerator />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
