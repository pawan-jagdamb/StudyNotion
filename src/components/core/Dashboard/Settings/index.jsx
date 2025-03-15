import {ChangeProfilePicture} from "./ChangeProfilePicture.jsx"
import {DeleteProfile} from "./DeleteProfile"
import {EditProfile} from "./EditProfile"
import {UpdatePassword} from "./UpdatePassword"
import React from 'react'

export const Setting = () => {
  return (
    <div>
      
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteProfile />

  
    </div>
  )
}



 