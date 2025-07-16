import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [time, setTime] = useState("");
  const [search, setSearch] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!inputMessage && !imageFile) {
      toast.error("Cannot send empty message.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("text", inputMessage);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/messages", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessages((prev) => [...prev, res.data]);
      setInputMessage("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
      <div className="w-3/4 h-full flex flex-col p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center mb-4 relative">
          <img
            src={assets.profile_img}
            alt="User"
            className="w-12 h-12 rounded-full mr-3 cursor-pointer"
          />
          <div className="flex flex-col cursor-pointer">
            <p className="font-semibold text-lg text-white">Chat</p>
            <div className="flex items-center text-sm text-white">
              <img src={assets.green_dot} alt="Online" className="w-2 h-2 mr-1" />
              <p>Online</p>
            </div>
          </div>
          <img
            src={assets.search_icon}
            alt="Search"
            className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
            onClick={() => setSearch(!search)}
          />
          {search && (
            <div className="absolute right-2 top-10 w-64">
              <img
                src={assets.search_icon}
                alt="Search"
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search your chats..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white outline-none border border-white/30 focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              />
            </div>
          )}
        </div>

        <hr className="border-white border-opacity-30" />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex items-start ${msg.isMine ? "justify-end" : ""}`}
            >
              {!msg.isMine && (
                <img
                  src={assets.profile_img}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div
                className={`${
                  msg.isMine
                    ? "bg-gray-200 text-gray-800"
                    : "bg-white bg-opacity-20 text-white"
                } p-3 rounded-lg max-w-xs shadow-md backdrop-blur-md`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Sent"
                    className="w-full rounded-lg object-cover max-h-40 mb-2"
                  />
                )}
                {msg.text && <p className="text-sm">{msg.text}</p>}
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {msg.isMine && (
                <img
                  src={assets.profile_img}
                  alt="User"
                  className="w-10 h-10 rounded-full ml-3"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Send a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-3 rounded-full border border-gray-200 bg-gray-300 text-black focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <label htmlFor="image" className="ml-3 cursor-pointer">
            <img src={assets.gallery_icon} alt="Gallery" className="w-6 h-6" />
          </label>
          <button
            onClick={handleSend}
            className="ml-3 p-2 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none transition-all duration-300"
          >
            <img src={assets.send_button} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
