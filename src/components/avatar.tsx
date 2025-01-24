import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const Avatar: React.FC = () => (
  <div className="p-4 [&_img]:rounded-full [&_img]:p-1 [&_img]:border [&_img]:border-gray-500">
    <StaticImage
      src="../assets/avatar.jpg"
      alt="Picture of Bruno"
      placeholder="blurred"
      layout="fixed"
      width={160}
      height={160}
    />
  </div>
)
