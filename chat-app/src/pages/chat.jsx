import React from 'react';
import Leftsidebar from '../components/Leftsidebar';
import Chatbox from '../components/Chatbox';
import Rightsidebar from '../components/Rightsidebar';

const Chat = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-1/4 h-full p-4 bg-gray-50 border-r">
        <Leftsidebar />
      </div>

      {/* Chatbox */}
      <div className="flex-1 h-full p-4">
        <Chatbox />
      </div>

      {/* Right Sidebar (uncomment if needed) */}
      {/*
      <div className="w-1/4 h-full p-4 bg-gray-100 border-l">
        <Rightsidebar />
      </div>
      */}
    </div>
  );
};

export default Chat;
