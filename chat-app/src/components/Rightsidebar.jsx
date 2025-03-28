import React from 'react';
import assets from '../assets/assets';
import { logout } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Rightsidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-80 bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => navigate('/profileupdate')}>
      {/* Profile Section */}
      <div className="flex flex-col items-center border-b pb-4">
        <img 
          src={assets.profile_img} 
          alt="Profile" 
          className="w-20 h-20 rounded-full border-2 border-green-500"
        />
        <h3 className="mt-2 text-lg font-semibold">Piranu</h3>
        <p className="text-gray-500 text-sm">Hi, I am using this app!!!</p>
      </div>
      
      {/* Media Section */}
      <div className="mt-4 border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-700">Media</h2>
        <div className="flex justify-between mt-2 text-gray-600">
          <h3 className="cursor-pointer hover:text-green-500">Videos</h3>
          <h3 className="cursor-pointer hover:text-green-500">Images</h3>
        </div>
      </div>

      {/* Images Section */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <img src={assets.pic1} alt="Media" className="w-20 h-20 object-cover rounded-md" />
        <img src={assets.pic2} alt="Media" className="w-20 h-20 object-cover rounded-md" />
        <img src={assets.pic3} alt="Media" className="w-20 h-20 object-cover rounded-md" />
        <img src={assets.pic4} alt="Media" className="w-20 h-20 object-cover rounded-md" />
        <img src={assets.pic1} alt="Media" className="w-20 h-20 object-cover rounded-md" />
      </div>
      
      {/* Logout Section */}
      <div className="mt-6 text-center">
        <button onClick = {() => logout()} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Rightsidebar;
