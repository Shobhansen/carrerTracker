import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaChartBar, 
    FaClipboardCheck, 
    FaEnvelopeOpenText, 
    FaComments 
} from 'react-icons/fa';

// Component for the navigation header on the landing page
const LandingHeader = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                
                {/* Logo/Brand */}
                <NavLink to="/" className="text-2xl font-bold text-blue-700">
                    CareerTrackr
                </NavLink>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-8 text-gray-700 font-medium">
                    <a href="#features" className="hover:text-blue-600 transition">Features</a>
                    <a href="#students" className="hover:text-blue-600 transition">Students</a>
                    <a href="#mentors" className="hover:text-blue-600 transition">Mentors</a>
                    <NavLink to="/admin" className="hover:text-blue-600 transition">Admin</NavLink>
                    
                    {/* Login Button */}
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                        Login
                    </button>
                </nav>
            </div>
        </header>
    );
};

// Component for a single feature card
const FeatureCard = ({ icon: Icon, title, description, id }) => (
    <div id={id} className="p-6">
        <Icon className="text-3xl text-blue-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-blue-700 mb-1">{title}</h3> 
        <p className="text-gray-600 leading-relaxed max-w-xs mx-auto text-sm">{description}</p> 
    </div>
);

export default function LandingPage() {
    
    const features = [
        { 
            id: 'profile',
            icon: FaChartBar, 
            title: "Profile Completeness Meter", 
            description: "Measure and improve your profile completion with a progress bar" 
        },
        { 
            id: 'role',
            icon: FaClipboardCheck, 
            title: "Role Readiness Indicator", 
            description: "Assess your readiness for desired roles using readiness signals" 
        },
        { 
            id: 'alerts',
            icon: FaEnvelopeOpenText, 
            title: "Job Alerts When Readiness ≥ 75%", 
            description: "Get notified about job opportunities once you reach 75% readiness" 
        },
        { 
            id: 'forum',
            icon: FaComments, 
            title: "Discussion Forum with Mentors", 
            description: "Engage in a forum with mentors to gain insights and ask questions" 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <LandingHeader />

            <main className="max-w-7xl mx-auto px-8">
                
                {/* Hero Section */}
                <section className="text-center py-20 bg-white rounded-xl shadow-lg mt-30">
                    
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4"> 
                        Explore Our Key Features
                    </h1>
    
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
                        Track profile completion, role readiness, job alerts, and mentoring interactions.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-6">
                        <NavLink 
                            to="/student/dashboard" 
                            className="px-8 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                        >
                            Get Started
                        </NavLink>
                        <button 
                            className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 text-base font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition transform hover:scale-105"
                        >
                            Join as a Mentor</button>
                    </div>
                </section>
                
                {/* Key Features Section */}
                <section id="features" className="py-50 text-center">
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 border-b-2 inline-block border-blue-500 pb-2">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                        {features.map((feature) => (
                            <FeatureCard 
                                key={feature.title} 
                                icon={feature.icon} 
                                title={feature.title} 
                                description={feature.description} 
                                id={feature.id}
                            />
                        ))}
                    </div>
                </section>

                {/* Static Sections for Nav Hashing (to match a:href links) */}
                <div id="students" className="h-40"></div>
                <div id="mentors" className="h-40"></div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-0">
                &copy; 2025 CareerTrackr, All rights reserved.
            </footer>
        </div>
    );
}