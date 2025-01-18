import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";

import type { AcceptsChildren } from "./types";

export const HeaderWrapper = ({ children }: AcceptsChildren) => (
  <Box as="header" boxShadow="rgba(29, 33, 41, 0.15) 0px 30px 20px -32px">
    {children}
  </Box>
);

export const HeaderContainer = ({ children }: AcceptsChildren) => (
  <Box padding={6} maxWidth="1300px" margin="0 auto" display="flex">
    {children}
  </Box>
);

interface HeaderProps {
  siteTitle: String;
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <Heading margin={0} flexGrow={1} fontSize="18px" lineHeight="inherit">
        <a href="/" className="inherit-color">
          {siteTitle}
        </a>
      </Heading>
      <Stack direction="row" spacing="2rem">
        <a href="/tils/" className="inherit-color">
          TILs
        </a>
        <a href="/blog/" className="inherit-color">
          Blog
        </a>
      </Stack>
    </HeaderContainer>
  </HeaderWrapper>
);
