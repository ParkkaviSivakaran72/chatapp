import { doc, getDoc, onSnapshot, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userReference = doc(db, "users", uid);
            const userSnap = await getDoc(userReference);

            if (!userSnap.exists()) {
                console.warn("User document does not exist! Creating new one...");

                // Create default user document
                const newUser = {
                    id: uid,
                    name: "",
                    avatar: "",
                    email: auth.currentUser?.email || "",
                    createdAt: serverTimestamp(),
                    lastSeen: Date.now(),
                };
                await setDoc(userReference, newUser);
                setUserData(newUser);
                navigate("/profileupdate");
                return;
            }

            const userData = userSnap.data();
            setUserData(userData);

            if (userData.avatar && userData.name) {
                navigate("/chat");
            } else {
                navigate("/profileupdate");
            }

            await updateDoc(userReference, {
                lastSeen: Date.now(),
            });

            // Update lastSeen every 60 seconds
            const intervalId = setInterval(async () => {
                if (auth.currentUser) {
                    await updateDoc(userReference, {
                        lastSeen: Date.now(),
                    });
                }
            }, 60000);

            // Clean up the interval on unmount
            return () => clearInterval(intervalId);

        } catch (error) {
            console.log("Error loading user data:", error);
        }
    };

    useEffect(() => {
        if (userData) {
            const chatReference = doc(db, "chats", userData.id);
            const unsub = onSnapshot(chatReference, async (res) => {
                const chatItems = res.data()?.chat || [];
                const tempData = [];

                for (const item of chatItems) {
                    const userReference = doc(db, "users", item.rId);
                    const userSnap = await getDoc(userReference);
                    const otherUser = userSnap.data();
                    tempData.push({ ...item, userData: otherUser });
                }

                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
            });

            return () => unsub();
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
