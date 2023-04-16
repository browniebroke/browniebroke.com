import React from 'react'
import { Link } from 'gatsby'
import { Badge } from '@chakra-ui/react'

interface TagProps {
  to: string
  children: React.ReactNode
}

export const Tag = ({ to, children }: TagProps) => {
  return (
    <Link to={to}>
      <Badge>{children}</Badge>
    </Link>
  )
}
