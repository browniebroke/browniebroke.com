import { Box } from '@chakra-ui/react'
import React from 'react'

export const SeeMoreStyles: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box as="p" m={12} textAlign={['center']}>
    {children}
  </Box>
)
