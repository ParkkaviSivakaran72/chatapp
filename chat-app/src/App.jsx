import React from 'react'
import Login from './pages/login'
import Chat from './pages/chat'
import ProfileUpdate from './pages/profileUpdate'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={< Login />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/profileupdate" element={<ProfileUpdate/>} />
      </Routes>
    </div>
  )
}

export default App