import React from 'react'
import { Link } from 'gatsby'

interface TagProps {
  to: string
  children: React.ReactNode
}

export const Tag = ({ to, children }: TagProps) => {
  return (
    <Link to={to}>
      <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded hover:bg-gray-200">
        {children}
      </span>
    </Link>
  )
}
