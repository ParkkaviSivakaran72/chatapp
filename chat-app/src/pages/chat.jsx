import React, { useEffect, useState } from 'react'
import Leftsidebar from '../components/Leftsidebar'
import Chatbox from '../components/Chatbox'
import Rightsidebar from '../components/rightsidebar'

const Chat = () => {
  

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100">
        <Leftsidebar />
      </div>

      {/* Chatbox */}
      <div className="w-1/2 p-4 bg-white">
        <Chatbox />
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100">
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Chat
