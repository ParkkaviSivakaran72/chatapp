import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${uid}`);
      let user = res.data;

      if (!user) {
        console.warn("User does not exist! Creating new one...");
        const newUser = {
          id: uid,
          name: "",
          avatar: "",
          email: "", // You can pass email from auth context
        };
        const createRes = await axios.post(`http://localhost:5000/api/users`, newUser);
        user = createRes.data;
        setUserData(user);
        navigate("/profileupdate");
        return;
      }

      setUserData(user);

      // Navigate based on profile completeness
      if (user.avatar && user.name) {
        navigate("/chat");
      } else {
        navigate("/profileupdate");
      }

      // Update lastSeen
      await axios.put(`http://localhost:5000/api/users/${uid}`, {
        lastSeen: Date.now(),
      });

      // Update every 60s
      const intervalId = setInterval(async () => {
        await axios.put(`http://localhost:5000/api/users/${uid}`, {
          lastSeen: Date.now(),
        });
      }, 60000);

      return () => clearInterval(intervalId);

    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  // Load chat data whenever userData changes
  useEffect(() => {
    if (userData) {
      const fetchChats = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/chats/${userData.id}`);
          const chats = res.data || [];
          setChatData(chats.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (error) {
          console.log("Error loading chats:", error);
        }
      };
      fetchChats();
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
