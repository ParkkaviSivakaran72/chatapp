import React from 'react'
import assets from '../assets/assets'

const ProfileUpdate = () => {
  return (
    <div>
      <div>
        <form action="">
          <h3>Profile Settings</h3>
          <label for="profile">
          <input type="file" id="profile" accept=".png, .jpeg, .jpg" hidden />
          <img src={assets.avatar_icon} alt="" />
          Upload profile image
          </label>
          <input type="text" placeholder='Your Name' required/>
          <textarea placeholder='add your Biography' required></textarea>

        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate