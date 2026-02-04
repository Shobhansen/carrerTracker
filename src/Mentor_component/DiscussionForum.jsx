import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

export default function DiscussionForum() {
  // Example connected students (fetch dynamically later)
  const connectedStudents = [
    {
      id: 1,
      name: "Shobhan Sen",
      expertise: "Web Development",
      email: "shobhan@example.com",
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    {
      id: 2,
      name: "Susmita Sinha",
      expertise: "UI/UX Design",
      email: "sinhasusmitay@example.com",
      avatar: "https://i.pravatar.cc/150?img=42",
    },
    {
      id: 3,
      name: "Samarpita Mukherjee",
      expertise: "AI/ML",
      email: "samarpita@example.com",
      avatar: "https://i.pravatar.cc/150?img=28",
    },
    {
      id: 4,
      name: "Soumita Das",
      expertise: "UI/UX Design",
      email: "soumita@example.com",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState(connectedStudents[0]);
  const [messages, setMessages] = useState([
    { sender: "student", text: "Hello! How can I assist you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const updated = [...messages, { sender: "mentor", text: newMessage }];
    setMessages(updated);
    setNewMessage("");

    // Simulated student reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "student", text: "Thanks! I’ll check and update you soon." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar - Students List */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <h2 className="text-xl font-bold text-amber-700 p-4 border-b border-gray-200">
          Your Students
        </h2>
        <ul className="overflow-y-auto h-[calc(80vh-60px)]">
          {connectedStudents.map((student) => (
            <li
              key={student.id}
              onClick={() => {
                setSelectedStudent(student);
                setMessages([
                  { sender: "student", text: `Hello! I'm ${student.name}.` },
                ]);
              }}
              className={`flex items-center p-4 cursor-pointer hover:bg-amber-50 ${
                selectedStudent.id === student.id ? "bg-amber-100" : ""
              }`}
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full mr-3 border border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{student.name}</p>
                <p className="text-xs text-gray-500">{student.expertise}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-amber-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <img
              src={selectedStudent.avatar}
              alt={selectedStudent.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
              <p className="text-sm text-amber-100">{selectedStudent.expertise}</p>
            </div>
          </div>
          <a
            href={`mailto:${selectedStudent.email}`}
            className="text-sm bg-white text-amber-600 px-3 py-1 rounded hover:bg-amber-50 transition"
          >
            Email Student
          </a>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-amber-50 to-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                msg.sender === "mentor" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "student" && (
                <FaUserCircle className="text-amber-500 text-2xl mr-2 mt-1" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm max-w-xs ${
                  msg.sender === "mentor"
                    ? "bg-amber-600 text-white rounded-br-none"
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
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
