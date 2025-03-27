import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useDeferredValue, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData,setUserData] = useState(null);
    const [chatData,setChatData] = useState(null);
    const loadUserData = async(uid) => {
        try {
            const userReference = doc(db, "users", uid)
            const userSnap = await getDoc(userReference)
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