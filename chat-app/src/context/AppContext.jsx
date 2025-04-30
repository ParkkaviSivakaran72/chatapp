import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useDeferredValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";



export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData,setUserData] = useState(null);
    const [chatData,setChatData] = useState(null);
    const loadUserData = async(uid) => {
        try {
            const userReference = doc(db, "users", uid)
            const userSnap = await getDoc(userReference)
            if (!userSnap.exists()) {
                console.warn("User document does not exist!");
                return;
              }
          
          
            const userData = userSnap.data();
            setUserData(userData);
           console.log(userData)

            if(userData.avatar && userData.name) {
                navigate('/chat')
            }
            else{
                navigate('/profileupdate')
            }
            await updateDoc(userReference,{
                lastSeen:Date.now()
            })
            setInterval(async() => {
                if(auth.chatUser){
                    await updateDoc(userReference,{
                        lastSeen:Date.now()
                    })
                }
            },60000)

        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
        if(userData){
            const chatReference = doc(db,"chats",userData.id);
            const unsub = onSnapshot(chatReference, async (res) => {
                const chatItems = res.data().chat;
                const tempData = [];
                for(const item of chatItems){
                    const userReference = doc(db,"users",item.rId);
                    const userSnap = await getDoc(userReference);
                    const userData = userSnap.data();
                    tempData.push({...item,userData})
                }
                setChatData(tempData.sort((a,b) => b.updatedAt - a.updatedAt))
            })
            return () => {
                unsub();
            }
        }
        
    },[userData])
    const value = {
        userData,setUserData,chatData,setChatData,loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;