import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-900 h-full text-gray-200 flex items-center flex-col py-5">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p>Please head over to the "Reports" section to generate your report</p>
    </div>
  );
}
