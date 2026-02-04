import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MentorDashboard from './Mentor_component/MDashboard';
import LandingPage from './LandingPage/LandingPage'
import StudentDashboard from './Student_component/StudentDashboard'
import AdminDashboard from './Admin_component/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Public Landing Page (Home Route) */}
        <Route path="/" element={<LandingPage/>} />

         {/* Mentor Portal (Nested Routing) */}
        {/* The /* allows components inside MentorDashboard to handle sub-paths like /mentor/dashboard, /mentor/profile */}
        <Route path="/mentor/*" element={<MentorDashboard />} />

        {/* Student Portal (Nested Routing) */}
        <Route path="/student/*" element={<StudentDashboard/>} />

        {/* Admin Portal (Placeholder for future development) */}
        <Route path="/admin/*" element={<AdminDashboard/>} />
        
         {/* 404 Fallback */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
