import React, { useState } from 'react';
import { FaSearch, FaFilter, FaStar, FaEnvelope } from 'react-icons/fa';

// Mock Mentor Data
const mockMentors = [
    { id: 1, name: "Maria Rodriguez", specialization: "React & Node.js", rating: 4.8, students: 5, bio: "Expert in scalable full-stack applications.", image: "https://placehold.co/40x40/50C878/FFFFFF?text=MR" },
    { id: 2, name: "David Chen", specialization: "Data Science & Python", rating: 4.5, students: 8, bio: "Focus on ML models and data visualization.", image: "https://placehold.co/40x40/008080/FFFFFF?text=DC" },
    { id: 3, name: "Sarah Malik", specialization: "UI/UX Design", rating: 4.9, students: 3, bio: "Certified Figma and design systems specialist.", image: "https://placehold.co/40x40/800080/FFFFFF?text=SM" },
    { id: 4, name: "Alex Jones", specialization: "Cloud & DevOps", rating: 4.2, students: 10, bio: "Experienced in AWS, Docker, and CI/CD pipelines.", image: "https://placehold.co/40x40/FF7F50/FFFFFF?text=AJ" },
];

export default function FindMentor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSkill, setFilterSkill] = useState('All');

    const availableSkills = ["All", "ReactJS", "Node.js", "Data Science", "UI/UX Design", "Cloud & DevOps"];

    const filteredMentors = mockMentors.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = filterSkill === 'All' || mentor.specialization.includes(filterSkill);
        return matchesSearch && matchesSkill;
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-grey-900 border-b pb-2 mb-4">Find Your Perfect Mentor</h1>

            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
                
                {/* Search Input */}
                <div className="flex items-center w-full md:w-2/5 border border-gray-300 rounded-lg overflow-hidden">
                    <FaSearch className="text-gray-400 ml-4 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 focus:outline-none"
                    />
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center w-full md:w-3/5 border border-gray-300 rounded-lg overflow-hidden">
                    <FaFilter className="text-gray-400 ml-4 flex-shrink-0" />
                    <select
                        value={filterSkill}
                        onChange={(e) => setFilterSkill(e.target.value)}
                        className="w-full p-3 bg-white focus:outline-none appearance-none"
                    >
                        <option value="All">Filter by Specialization (All)</option>
                        {availableSkills.slice(1).map(skill => (
                            <option key={skill} value={skill}>{skill}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Mentor List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMentors.length > 0 ? (
                    filteredMentors.map(mentor => (
                        <div key={mentor.id} className="bg-white p-5 rounded-xl shadow-lg flex justify-between items-start hover:shadow-2xl transition-shadow duration-300">
                            
                            <div className="flex space-x-4">
                                <img src={mentor.image} alt={mentor.name} className="h-16 w-16 rounded-full object-cover shadow-md" onError={(e) => e.target.src = 'https://placehold.co/64x64/CCCCCC/333333?text=N%2FA'}/>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                                    <p className="text-blue-700 font-medium text-sm mb-2">{mentor.specialization}</p>
                                    <p className="text-gray-600 text-sm italic">{mentor.bio}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center text-amber-500 font-semibold text-sm">
                                    <FaStar className="mr-1" /> {mentor.rating} ({mentor.students} Students)
                                </div>
                                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2">
                                    <FaEnvelope /> <span>Connect</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center text-xl text-gray-500 p-10 bg-white rounded-xl shadow-lg">
                        No mentors found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}