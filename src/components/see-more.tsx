import { Box } from '@chakra-ui/react'
import React from 'react'
import { AcceptsChildren } from './types'

export const SeeMoreStyles: React.FC<AcceptsChildren> = ({ children }) => (
  <Box as="p" m={12} textAlign={['center']}>
    {children}
  </Box>
)
