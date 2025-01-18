import React from 'react'
import { Box } from '@chakra-ui/react'
import avatarJpg from '../assets/avatar.jpg';

export const Avatar: React.FC = () => (
  <Box
    padding={4}
    sx={{
      img: {
        borderRadius: '50%',
        padding: 'var(--chakra-space-1)',
        border: '1px solid',
        borderColor: 'gray.500',
      },
    }}
  >
    <img
      src={avatarJpg.src}
      alt="Picture of Bruno"
    />
  </Box>
)
