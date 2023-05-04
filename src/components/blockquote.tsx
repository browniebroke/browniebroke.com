import React from 'react'
import { Box } from '@chakra-ui/react'
import { BoxProps } from '@chakra-ui/layout/dist/box'

export const BlockQuote = (props: BoxProps) => (
  <Box
    as="blockquote"
    pl={4}
    mb={4}
    borderLeftWidth={5}
    borderLeftColor="gray.200"
    fontStyle="italic"
    {...props}
  />
)
