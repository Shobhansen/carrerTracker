import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

export default function DiscussionForum() {
  // Example connected mentors (this will come from backend)
  const connectedMentors = [
    {
      id: 1,
      name: "Suman Das",
      expertise: "Web Development",
      email: "sumandas@example.com",
      avatar: "https://i.pravatar.cc/150?img=17"
    },
    {
      id: 2,
      name: "Rahul Chakraborty",
      expertise: "UI/UX Design",
      email: "rahul.chakraborty@example.com",
      avatar: "https://i.pravatar.cc/150?img=52"
    }
  ];

  const [selectedMentor, setSelectedMentor] = useState(connectedMentors[0]);
  const [messages, setMessages] = useState([
    { sender: "mentor", text: "Hello! How can I assist you today?" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const updated = [...messages, { sender: "student", text: newMessage }];
    setMessages(updated);
    setNewMessage("");

    // Mock mentor reply (can replace with backend socket/chat API)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "mentor", text: "Got it! I'll review that and get back to you." }
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar - Mentor List */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <h2 className="text-xl font-bold text-blue-700 p-4 border-b border-gray-200">
          Your Mentors
        </h2>
        <ul>
          {connectedMentors.map(mentor => (
            <li
              key={mentor.id}
              onClick={() => {
                setSelectedMentor(mentor);
                setMessages([{ sender: "mentor", text: `Hello! I'm ${mentor.name}.` }]);
              }}
              className={`flex items-center p-4 cursor-pointer hover:bg-blue-50 ${
                selectedMentor.id === mentor.id ? "bg-blue-100" : ""
              }`}
            >
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-10 h-10 rounded-full mr-3 border border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{mentor.name}</p>
                <p className="text-xs text-gray-500">{mentor.expertise}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <img
              src={selectedMentor.avatar}
              alt={selectedMentor.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold text-lg">{selectedMentor.name}</h3>
              <p className="text-sm text-blue-100">{selectedMentor.expertise}</p>
            </div>
          </div>
          <a
            href={`mailto:${selectedMentor.email}`}
            className="text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
          >
            Email Mentor
          </a>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-blue-50 to-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                msg.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "mentor" && (
                <FaUserCircle className="text-blue-500 text-2xl mr-2 mt-1" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm max-w-xs ${
                  msg.sender === "student"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="border-t border-gray-200 bg-white p-3 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
