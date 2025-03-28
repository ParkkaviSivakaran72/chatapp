import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
// import {upload} from "../lib/upload.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const {setUserData} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docReference = doc(db, "users", user.uid);
        const docSnap = await getDoc(docReference);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().biography) {
          setBio(docSnap.data().biography);
        }
        if (docSnap.data().avatar) {
          setPreviousImage(docSnap.data().avatar);
        }
      }
    });
  }, []);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      // if (!previousImage && !image) {
      //   toast.error("Upload your profile photo");
      //   return;
      // }
  
      if (!uid) {
        toast.error("User not found.");
        return;
      }
  
      const docReference = doc(db, "users", uid);
  
      // let imageURL = previousImage; // Default to existing image
  
      if (image) {
        // imageURL = await upload(image); // Wait for upload to complete
        // setPreviousImage(imageURL);
      }
  
      await updateDoc(docReference, {
        // avatar: imageURL,
        name: name,
        biography: bio,
      });
      const snap = await getDoc(docReference);
      setUserData(snap.data());

      navigate('/chat')
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <form onSubmit={profileUpdate} action="">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <label htmlFor="avatar" className="cursor-pointer">
            <input
              type="file"
              id="avatar"
              accept=".jpg, .jpeg, .png"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
               src={image ? URL.createObjectURL(image) : previousImage || assets.avatar_icon}

              alt="avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300"
            />
          </label>
          <input
            onChange={(event) => setName(event.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            className="mt-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            onChange={(event) => setBio(event.target.value)}
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
      </form>
    </div>
  );
};

export default ProfileUpdate;
