import React from 'react';
import { Routes, Route, Navigate,useLocation  } from 'react-router-dom';

//core Components
import TopNavigation from './TopNavigation'; // Assuming this component exists
import DashboardContent from './DashboardContent'; // Assuming this component exists
import ReadinessPage from './ReadinessPage'; // Assuming this component exists
import FindMentor from './FindMentor'; // This is the component you provided
import Profile from './Profile';

//Auth
import StudentRegistration1 from './Auth/StudentRegister';
import Studentlogin from './Auth/StudentLogin';

//Test module
import TestIntro from'./testModule/TestIntro';
import TestPage from'./testModule/TestPage';
import ResultPage from'./testModule/ResultPage';
import JobAlertSection from './JobAlertSection';
import DiscussionForum from './DiscussionForum';
import ReadinessTestIntro from './testModule/ReadinessTestIntro';
import ReadinessTest from './testModule/ReadinessTest';
import ReadinessResult from './testModule/ReadinessResult';




export default function StudentDashboard() {

    const location=useLocation();

    // Static student data for demonstration
    const studentData = {
        name: "Shobhan Sen",
        initials: "SS",
        completenessScore: 70,
        readinessScore: 65,
        jobAlerts: 3,
        mentor: "2"
    };
    // Hide navbar for registration & login routes
    const hideNavbarRoutes = [
        "/student/registration", 
        "/student/login",
        "/student/test/start",
        "/student/test/questions",
        "/student/test/result",
        "/student/readiness-test-intro",
        "/student/readiness-test",
        "/student/readiness-result"
    ];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);


    return (
        <div className="min-h-screen bg-gray-50">
            {/* NOTE: The TopNavigation component MUST use ABSOLUTE paths (e.g., to="/student/dashboard") 
                to avoid 404 errors when navigating from nested routes like /dashboard/readiness.
            */}

            {/* Conditionally render navbar */}
            {shouldShowNavbar && <TopNavigation student={studentData} />}
            

            <main className={`${shouldShowNavbar ? 'px-20 py-8' : ''} `}>     
                <Routes>
                    {/* Default */}
                    <Route path="/" element={<Navigate to="login" replace />} />


                    {/* Auth */}
                    <Route path='registration' element={<StudentRegistration1 />} />
                    <Route path='login' element={<Studentlogin/>} />

                    {/* Test Module Routes */}
                    <Route path='test/start' element={<TestIntro/>} />
                    <Route path='test/questions' element={<TestPage/>} />
                    <Route path='test/result' element={<ResultPage/>} />

                    {/*  Dashboard Routes*/}
                    <Route path="dashboard" element={<DashboardContent student={studentData} />} />

                    {/* Readiness page  */}
                    <Route path="dashboard/readiness" element={<ReadinessPage />} />


                    <Route path="readiness-test-intro" element={<ReadinessTestIntro />} />
                    <Route path="readiness-test" element={<ReadinessTest />} />
                    <Route path="readiness-result" element={<ReadinessResult />} />



                    {/* Job Alert page  */}
                    <Route path="dashboard/job" element={<JobAlertSection/>} />

                    {/* 2. Main Module Routes */}
                    <Route path="profile" element={<Profile />} />

                    {/* The FindMentor component from the Canvas */}
                    <Route path="find-mentor" element={<FindMentor />} />

                    <Route path="forum" element={<DiscussionForum/>} />

                    {/* 404 Fallback */}
                    <Route path="*" element={<div className="text-center text-red-600 p-10">404: Student Page Not Found</div>} />
                </Routes>
            </main>
        </div>
    );
}