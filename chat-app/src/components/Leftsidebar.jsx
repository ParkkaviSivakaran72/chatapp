import React from "react";
import assets from "../assets/assets";

const chats = [
  {
    id: 1,
    name: "Piranu",
    message: "Hi, How are you?",
    image: assets.profile_img,
  },
  {
    id: 2,
    name: "John Doe",
    message: "Let's catch up later!",
    image: assets.profile_img,
  },
  {
    id: 3,
    name: "Alice",
    message: "Did you complete the task?",
    image: assets.profile_img,
  },
  {
    id: 4,
    name: "Charlie",
    message: "Hey, are you free now?",
    image: assets.profile_img,
  },
];

const Leftsidebar = () => {
  return (
    <div className="h-screen w-80 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-col p-4 shadow-2xl rounded-lg backdrop-blur-lg bg-opacity-30 border border-white/20 ">
      {/* Logo & Menu Icon */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <img src={assets.logo_icon} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold">ChatWeb</h3>
        </div>
        <img src={assets.menu_icon} alt="Menu" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <img src={assets.search_icon} alt="Search" className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search your chats..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white outline-none border border-white/30 focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
        />
      </div>

      {/* Chats List - Dynamically Rendered */}
      <div className="overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 cursor-pointer transition duration-300 border border-transparent hover:border-white/30 shadow-lg"
          >
            <img src={chat.image} alt={chat.name} className="w-12 h-12 rounded-full border border-white/30 shadow-sm" />
            <div>
              <p className="font-semibold">{chat.name}</p>
              <span className="text-sm text-gray-300">{chat.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leftsidebar;
