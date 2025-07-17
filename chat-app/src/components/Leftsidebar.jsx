import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import assets from "../assets/assets";
import { faker } from "@faker-js/faker";

const LeftSidebar = ({ currentUser, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const [showAddUserOverlay, setShowAddUserOverlay] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");

  // Fetch chats on load
  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChats();
  }, [currentUser]);


  useEffect(() => {
    const fetchChatters = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/chat/getChatter");
        setChats(res.data);
      } catch (err) {
        console.error("Error fetching chatters:", err);
      }
    }
  },[])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/search?username=${encodeURIComponent(
          searchTerm
        )}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    if (!newUserName || !newUserPhone) return;

    try {
      const res = await axios.post("http://localhost:3000/api/chat/chatter", {
        name: newUserName,
        phoneNumber: newUserPhone,
      });

      console.log("User added:", res.data);
      setShowAddUserOverlay(false);
      setNewUserName("");
      setNewUserPhone("");
      // You might refresh chat list or give a toast here
    } catch (err) {
      console.error(
        "Error adding user:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white border-r relative">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <img src={assets.logo} alt="Logo" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">ChatWeb</h1>
        </div>

        {/* Search Bar */}
        <div className="p-3 flex items-center gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAddUserOverlay(true)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <BiAddToQueue className="text-xl text-gray-700" />
          </button>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">No chats yet.</div>
          ) : (
            <ul>
              {chats.map((chat) => {
                const otherUser = chat.users.find(
                  (u) => u._id !== currentUser?._id
                );
                return (
                  <li
                    key={chat._id}
                    onClick={() => onSelectChat(chat._id)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 border-b"
                  >
                    <img
                      src={
                        otherUser?.avatarUrl || "https://via.placeholder.com/40"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {otherUser?.username || "Unknown"}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {chat.lastMessage?.text || "Start a conversation"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {chat.updatedAt
                        ? new Date(chat.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add User Overlay */}
      {showAddUserOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          {/* <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setShowAddUserOverlay(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Start a New Chat</h2>
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full mb-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Search
            </button>
            <ul className="max-h-60 overflow-y-auto">
              {searchResults.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleSelectUser(user._id)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={user.avatarUrl || "https://via.placeholder.com/32"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800">{user.username}</span>
                </li>
              ))}
            </ul>
          </div> */}
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setShowAddUserOverlay(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Start a New Chat</h2>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleAddUser}
              className="w-full mb-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;
