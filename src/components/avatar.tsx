import React from 'react'
import { Box } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'

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
    <StaticImage
      src="../assets/avatar.jpg"
      alt="Picture of Bruno"
      placeholder="blurred"
      layout="fixed"
      width={160}
      height={160}
    />
  </Box>
)
