import React, { useEffect } from 'react'
import Login from './pages/login'
import Chat from './pages/chat'
import ProfileUpdate from './pages/profileUpdate'
import { Route,Routes, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'

const App = () => {

  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if(user){

      }
      else{
        useNavigate('/')
      }
    })
  },[])

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