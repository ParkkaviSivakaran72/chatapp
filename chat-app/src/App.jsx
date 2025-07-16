import React, { useContext, useEffect } from 'react'
import Login from './pages/login'
import Chat from './pages/chat'
import ProfileUpdate from './pages/profileUpdate'
import { Route,Routes, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


import { AppContext } from './context/AppContext'

const App = () => {

  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext);

  // useEffect(()=>{
  //   onAuthStateChanged(auth, async(user) => {
  //     if(user){
  //       navigate('/chat')
        
  //       await loadUserData(user.uid);
  //     }
  //     else{
  //       navigate('/')
  //     }
  //   })
  // },[])

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