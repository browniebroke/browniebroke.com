import React from 'react'
import { Heading } from '@chakra-ui/react'

import { AcceptsChildren } from './types'

export const SectionTitle = ({ children }: AcceptsChildren) => (
  <Heading
    as="h2"
    size="lg"
    textAlign="center"
    margin="3rem 0"
    sx={{
      svg: {
        display: 'inline',
        align: 'left',
        verticalAlign: 'top',
        height: '0.5em',
      },
    }}
  >
    {children}
  </Heading>
)
