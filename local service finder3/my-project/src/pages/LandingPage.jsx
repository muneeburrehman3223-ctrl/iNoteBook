import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Tailwind Test */}
      <div className="bg-red-500 text-white p-5 text-center">Tailwind Test</div>

      {/* Main Landing Page */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-purple-600">
        <h1 className="text-5xl font-bold text-white mb-10">
          Local Service Finder
        </h1>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/worker-login")}
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            I am a Worker
          </button>
          <button
            onClick={() => navigate("/user-login")}
            className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            I Need a Service
          </button>
        </div>
      </div>
    </div>
  );
}
