import React, { useEffect, useState } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setName(data.name || "");
        setBio(data.biography || "");
        setPreviousImage(data.avatar || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const profileUpdate = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("biography", bio);
      if (image) {
        formData.append("avatar", image);
      }

      await axios.put("http://localhost:5000/api/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <form onSubmit={profileUpdate}>
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
              src={
                image
                  ? URL.createObjectURL(image)
                  : previousImage || assets.avatar_icon
              }
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
