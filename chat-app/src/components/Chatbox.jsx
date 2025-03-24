import React, { useEffect, useState } from "react";
import assets from "../assets/assets";

const Chatbox = () => {
  const [time, setTime] = useState("");
  const [search,setSearch] = useState(false)

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

  return (


    <div className="flex h-screen w-screen bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden ">
      

      {/* Chatbox Area */}
      <div className="w-3/4 h-full flex flex-col p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center mb-4">
          <img
            src={assets.profile_img}
            alt="User"
            className="w-12 h-12 rounded-full mr-3 cursor-pointer"
          />
          <div className="flex flex-col cursor-pointer">
            <p className="font-semibold text-lg text-white">Piranu</p>
            <div className="flex items-center text-sm text-white">
              <img src={assets.green_dot} alt="Online" className="w-2 h-2 mr-1" />
              <p>Online</p>
            </div>
          </div>
          <img
            src={assets.search_icon}
            alt="Search"
            className="absolute top-2 right-2 ml-auto w-6 h-6 cursor-pointer"
            onClick={() => setSearch(!search)}
          />
          {search && (
            <div className="absolute mb-6 right-2 top-10" >
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
          {/* User Message */}
          <div className="flex items-start">
            <img
              src={assets.profile_img}
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="bg-white bg-opacity-20 text-white p-3 rounded-lg max-w-xs shadow-md backdrop-blur-md">
              <p className="text-sm">Hi, How are you?</p>
              <p className="text-xs text-gray-300 mt-1">{time}</p>
            </div>
          </div>

          {/* Image Message */}
          <div className="flex items-start justify-end">
            <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs shadow-md">
              <img
                src={assets.pic1}
                alt="Sent Image"
                className="w-full rounded-lg object-cover max-h-40"
              />
              <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
            <img
              src={assets.profile_img}
              alt="User"
              className="w-10 h-10 rounded-full ml-3"
            />
          </div>

          {/* Received Message */}
          <div className="flex items-start justify-end">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs shadow-md">
              <p className="text-sm">I am fine. Are you?</p>
              <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
            <img
              src={assets.profile_img}
              alt="User"
              className="w-10 h-10 rounded-full ml-3"
            />
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="flex mt-2">
          <p className="text-gray-300 italic">typing...</p>
        </div>

        {/* Message Input */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 p-3 rounded-full border border-gray-200 bg-gray-300  text-black focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" className="hidden" />
          <label htmlFor="image" className="ml-3 cursor-pointer">
            <img src={assets.gallery_icon} alt="Gallery" className="w-6 h-6" />
          </label>
          <button className="ml-3 p-2 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none transition-all duration-300">
            <img src={assets.send_button} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
