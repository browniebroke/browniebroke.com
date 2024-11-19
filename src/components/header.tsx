import React from 'react'
import { Link } from 'gatsby'
import { Box, Heading, Stack } from '@chakra-ui/react'

import { AcceptsChildren } from './types'

export const HeaderWrapper = ({ children }: AcceptsChildren) => (
  <Box as="header" boxShadow="rgba(29, 33, 41, 0.15) 0px 30px 20px -32px">
    {children}
  </Box>
)

export const HeaderContainer = ({ children }: AcceptsChildren) => (
  <Box padding={6} maxWidth="1300px" margin="0 auto" display="flex">
    {children}
  </Box>
)

interface HeaderProps {
  siteTitle: String
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <Heading margin={0} flexGrow={1} fontSize="18px" lineHeight="inherit">
        <Link to="/">{siteTitle}</Link>
      </Heading>
      <Stack direction="row" gap="2rem">
        <Link to="/tils/">TILs</Link>
        <Link to="/blog/">Blog</Link>
      </Stack>
    </HeaderContainer>
  </HeaderWrapper>
)
