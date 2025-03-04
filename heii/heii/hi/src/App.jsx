import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Index from "./Pages/index"; 
import Profile from "./Pages/profile"; 
import DCMeetings from "./Pages/dcmeeting"; 
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} /> {/* Login Page */}
        <Route path="/index" element={<Index />} /> {/* Home Page (index.jsx) */}
        <Route path="/profile" element={<Profile />} /> {/*  (profile.jsx) */}
        <Route path="/dcmeeting" element={<DCMeetings />} /> {/*  (dcmeeting.jsx) */}

        {/* student dashboard */}
        <Route path="/student-dashboard" element={<Index />} /> {/* ✅ React Dashboard for Students */}
      </Routes>
    </Router>
  );
}
