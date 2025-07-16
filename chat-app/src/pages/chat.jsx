import React from "react";
import LeftSidebar from "../components/Leftsidebar";
import Chatbox from "../components/Chatbox";
import Rightsidebar from "../components/rightsidebar";

const Chat = ({ currentUser }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-72 min-w-[260px] bg-white border-r shadow-sm">
        <LeftSidebar currentUser={currentUser} />
      </div>

      {/* Chatbox */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600">
        <Chatbox currentUser={currentUser} />
      </div>

      {/* Right Sidebar
      <div className="w-72 min-w-[260px] bg-white border-l shadow-sm">
        <Rightsidebar currentUser={currentUser} />
      </div> */}
    </div>
  );
};

export default Chat;
