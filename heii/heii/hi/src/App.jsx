import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Index from "./Pages/Student/index"; 
import Profile from "./Pages/Student/profile"; 
import DCMeetings from "./Pages/Student/dcmeeting"; 
import Publications from "./Pages/Student/publication"; 
import AddPublication from "./Pages/Student/AddPublication"; 
import Courses from "./Pages/Student/swayam_course"; 
import Dashboardg from "./Pages/Guide/index2"; 
import Profileg from "./Pages/Guide/profile"; 
import ScholarProfiles from "./Pages/Guide/ScholarProfile"; 
// import Index2 from "./Pages/index2"; 
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} /> {/* Login Page */}
        <Route path="/index" element={<Index />} /> {/* Home Page (index.jsx) */}
        <Route path="/profile" element={<Profile />} /> {/*  (profile.jsx) */}
        <Route path="/dcmeeting" element={<DCMeetings />} /> {/*  (dcmeeting.jsx) */}
        <Route path="/publication" element={<Publications />} /> {/*  (publication.jsx) */}
        <Route path="/addpublication" element={<AddPublication />} /> {/*  (addpublication.jsx) */}
        <Route path="/swayam_course" element={<Courses />} /> {/*  (swayam_courses.jsx) */}
        <Route path="/index2" element={<Dashboardg />} />  
        <Route path="/profileg" element={<Profileg />} />  
        <Route path="/scholarprofile" element={<ScholarProfiles />} />  
      </Routes>
    </Router>
  );
}
