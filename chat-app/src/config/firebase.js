
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {getFirestore, setDoc} from "firebase/firestore"

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
        await setDoc(Doc(db,"users",user.uid))
    } catch (error) {
        
    }
}