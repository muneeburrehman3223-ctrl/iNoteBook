import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerSignUp from "./pages/WorkerSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker-signup" element={<WorkerSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
