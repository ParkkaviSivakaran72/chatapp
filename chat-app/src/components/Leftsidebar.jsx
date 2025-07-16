// components/LeftSidebar.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const LeftSidebar = ({ currentUser, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);

  // Fetch chats on load
  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [currentUser]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/search?username=${encodeURIComponent(searchTerm)}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectUser = async (selectedUserId) => {
    try {
      const token = localStorage.getItem("token");
      // Create chat or return existing
      const res = await axios.post(
        "http://localhost:5000/api/chats",
        { recipientId: selectedUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh chats
      const chatsRes = await axios.get("http://localhost:5000/api/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(chatsRes.data);

      // Select the chat
      onSelectChat(res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white bg-opacity-10 backdrop-blur rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-1 rounded"
        >
          Search
        </button>
      </div>
      <ul className="mb-4">
        {searchResults.map((user) => (
          <li
            key={user._id}
            onClick={() => handleSelectUser(user._id)}
            className="cursor-pointer p-2 hover:bg-blue-100 rounded"
          >
            {user.username}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Your Chats</h3>
      <ul>
        {chats.map((chat) => {
          const otherUser = chat.users.find((u) => u._id !== currentUser._id);
          return (
            <li
              key={chat._id}
              onClick={() => onSelectChat(chat._id)}
              className="cursor-pointer p-2 hover:bg-blue-100 rounded"
            >
              Chat with: {otherUser?.username || "Unknown"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar;
