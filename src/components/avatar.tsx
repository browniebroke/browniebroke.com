import React from 'react'
import avatarJpg from "../assets/avatar.jpg";

export const Avatar: React.FC = () => (
  <div className="p-4 [&_img]:rounded-full [&_img]:p-1 [&_img]:border [&_img]:border-gray-500">
    <img src={avatarJpg.src} alt='Profile Picture' width={160}/>
  </div>
)
