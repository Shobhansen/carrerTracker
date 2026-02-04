import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaClipboardCheck,
  FaEnvelopeOpenText,
  FaComments,
  FaUserPlus,
  FaBrain,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";

const LandingHeader = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isManualScroll, setIsManualScroll] = useState(false);

  const activeClass =
    "text-blue-600 font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 transition-all duration-300";
  const inactiveClass = "text-gray-700 hover:text-blue-600 transition duration-200";

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  // Detect section on scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScrollSpy = () => {
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, "home")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          CareerTrackr
        </a>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-gray-700 font-medium">
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "home")}
            className={activeSection === "home" ? activeClass : inactiveClass}
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => handleScroll(e, "features")}
            className={activeSection === "features" ? activeClass : inactiveClass}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScroll(e, "how-it-works")}
            className={activeSection === "how-it-works" ? activeClass : inactiveClass}
          >
            How It Works
          </a>

          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Admin
          </NavLink>

          <NavLink
            to="/student/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
    <Icon className="text-3xl text-blue-600 mx-auto mb-2" />
    <h3 className="text-lg font-semibold text-blue-700 mb-1">{title}</h3>
    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto text-sm">
      {description}
    </p>
  </div>
);

export default function LandingPage() {
  const features = [
    {
      icon: FaChartBar,
      title: "Profile Completeness Meter",
      description: "Measure and improve your profile completion with a progress bar",
    },
    {
      icon: FaClipboardCheck,
      title: "Role Readiness Indicator",
      description: "Assess your readiness for desired roles using readiness signals",
    },
    {
      icon: FaEnvelopeOpenText,
      title: "Job Alerts When Readiness ≥ 75%",
      description: "Get notified about job opportunities once you reach 75% readiness",
    },
    {
      icon: FaComments,
      title: "Discussion Forum with Mentors",
      description: "Engage in a forum with mentors to gain insights and ask questions",
    },
  ];

  const steps = [
    {
      icon: FaUserPlus,
      title: "Register",
      desc: "Sign up as a student or mentor and create your personalized account easily.",
    },
    {
      icon: FaBrain,
      title: "Take the Skill Test",
      desc: "Attempt the subject-based test to evaluate your current knowledge and strengths.",
    },
    {
      icon: FaLightbulb,
      title: "View Your Performance",
      desc: "Get instant test results with a detailed score and motivational feedback.",
    },
    {
      icon: FaHandshake,
      title: "Connect & Grow",
      desc: "Engage with mentors, gain insights, and improve your readiness for opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <LandingHeader />

      <main className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <section id="home" className="scroll-mt-50 text-center py-20 bg-white rounded-xl shadow-lg mt-30">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Explore Our Key Features
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Track profile completion, role readiness, job alerts, and mentoring
            interactions.
          </p>
          <div className="flex justify-center space-x-6">
            <NavLink
              to="/student/registration"
              className="px-8 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started
            </NavLink>
            <NavLink
              to="/mentor/login"
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 text-base font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition transform hover:scale-105"
            >
              Join as a Mentor
            </NavLink>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-24 text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 mt-25 border-b-2 inline-block border-blue-500 pb-2">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 bg-gradient-to-r from-blue-50 to-blue-200 rounded-2xl shadow-inner mt-10 mb-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="text-blue-600 text-4xl mb-4 mx-auto flex justify-center">
                  <step.icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-0">
        &copy; 2025 CareerTrackr, All rights reserved.
      </footer>
    </div>
  );
}
