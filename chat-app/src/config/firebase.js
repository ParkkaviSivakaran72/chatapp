
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getFirestore,doc, setDoc} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCDfhzh9Td5C1_AdaVdie2J2tVuJVVF3Xw",
  authDomain: "chat-app-f3a62.firebaseapp.com",
  projectId: "chat-app-f3a62",
  storageBucket: "chat-app-f3a62.firebasestorage.app",
  messagingSenderId: "1049379359546",
  appId: "1:1049379359546:web:b5e822ccde131f78ec1e03"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (username,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await setDoc(doc(db,"users",user.uid),{
          id: user.uid,
          username:username.toLowerCase(),
          email,
          name:"",
          avatar:"",
          biography:"Hi I am using chat app !!!",
          lastSeen:Date.now()

        })
        await setDoc(doc(db,"chats",user.uid),{
          chat:[]
        })
    } catch (error) {
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}

const login = async (email,password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = async ( ) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}
export {signup,login,logout,auth,db}