import React, { use, useEffect, useState } from "react";
import assets from "../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [previousImage,setPreviousImage] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setUid(user.uid);
        const docReference = doc(db,'users',user.uid);
        const docSnap = getDoc(docReference)
        if(docSnap.data().name){
          setName(docSnap.data().name)
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio)
        }
        if(docSnap.data().avatar){
          setPreviousImage(docSnap.data().avatar)
        }
      }
    })
  })
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
        <label htmlFor="profile" className="cursor-pointer">
          <input
            type="file"
            id="profile"
            accept=".jpg, .jpeg, .png"
            required
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={image ? URL.createObjectURL(image) : assets.avatar_icon}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300"
          />
        </label>
        <input
          onClick={(event) => setName(event.target.value)}
          value={name}
          type="text"
          placeholder="Your name"
          className="mt-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          onClick={(event) => setBio(event.target.value)}
          value={bio}
          placeholder="Add a small Biography about you!"
          className="mt-4 w-full p-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
