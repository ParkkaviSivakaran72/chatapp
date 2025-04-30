import React, { useEffect, useState } from 'react'
import Leftsidebar from '../components/Leftsidebar'
import Chatbox from '../components/Chatbox'
import Rightsidebar from '../components/rightsidebar'

const Chat = () => {
  

  return (
    <><div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-2/8 h-full  p-4 ">
        <Leftsidebar />
      </div>

      {/* Chatbox */}
      <div className="w-3/4 h-full p-4 mr-4">
        <Chatbox />
      </div>
    </div>
      // Right Sidebar 
      {/* <div className="w-1/4 p-4 bg-gray-100">
        <Rightsidebar />
      </div> */}
      </> 
    
  )
}

export default Chat
