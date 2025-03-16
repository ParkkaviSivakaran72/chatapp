import React, { useEffect, useState } from "react";
import assets from "../assets/assets";

const Chatbox = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }, 60000);

    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}`);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col p-4 bg-gradient-to-r from-blue-500 to-purple-600 align-center border rounded-lg shadow-md max-w-lg w-full h-full">
      <div className="flex items-center mb-4">
        <img
          src={assets.profile_img}
          alt=""
          className="w-12 h-12 rounded-full mr-3 cursor-pointer"
        />
        <div className="flex flex-col cursor-pointer">
          <p className="font-semibold text-lg text-white cursor-pointer">
            Piranu
          </p>
          <div className="flex items-center text-sm text-white cursor-pointer">
            <img src={assets.green_dot} alt="" className="w-2 h-2 mr-1" />
            <p>Online</p>
          </div>
        </div>
        <img
          src={assets.search_icon}
          alt=""
          className="ml-auto w-6 h-6 cursor-pointer"
        />
      </div>
      <hr />

      <div className="flex-1 overflow-y-auto mb-4 p-4">
        {/* Chat message from the user */}

        <div className="flex items-start mb-4">
          <img
            src={assets.profile_img}
            alt=""
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
            <p className="text-sm">Hi, How are you?</p>
            <p className="text-xs text-gray-200">{time}</p>
          </div>
        </div>

        {/* Chat message from the recipient */}
        <div className="flex items-start mb-4 justify-end">
          <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs">
            <p className="text-sm">I am fine. Are you?</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
          <img
            src={assets.profile_img}
            alt=""
            className="w-10 h-10 rounded-full ml-3"
          />
        </div>
      </div>

      {/* Send message section */}
      <div class="flex mt-4">
        <p class="text-gray-700 text-m italic">typing...</p>
      </div>
      <div className="mt-4 flex items-center mt-auto">
        <input
          type="text"
          placeholder="Send a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          className="hidden"
        />
        <label htmlFor="image" className="ml-3 cursor-pointer">
          <img src={assets.gallery_icon} alt="" className="w-6 h-6" />
        </label>
        <button className="ml-3 p-2 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
          <img src={assets.send_button} alt="" className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
// some errors