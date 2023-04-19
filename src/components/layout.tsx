import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Box, ChakraProvider, Link, Text } from '@chakra-ui/react'

import { Header } from './header'
import { theme } from '../utils/theme'
import { AcceptsChildren } from './types'

interface LayoutProps extends AcceptsChildren {
  headerImage?: IGatsbyImageData
}

const getHeroImage = (heroImage?: IGatsbyImageData) => {
  if (heroImage) {
    return (
      <Box padding={0}>
        <GatsbyImage image={heroImage} alt="" />
      </Box>
    )
  }
}

export const Layout = ({ headerImage, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <ChakraProvider theme={theme}>
        <Header siteTitle={data.site.siteMetadata.title} />
        {getHeroImage(headerImage)}
        <Box
          marginY="0"
          marginX="auto"
          paddingTop="3rem"
          paddingBottom="1.5rem"
          paddingX="1rem"
          maxWidth="700px"
          minHeight="100vh"
        >
          <Box as="main" minHeight="70vh">
            {children}
          </Box>
          <footer>
            <Text as="span" fontSize="0.7em">
              © {new Date().getFullYear()}, Built with{` `}
              <Link href="https://www.gatsbyjs.org" title="GatsbyJS" isExternal>
                Gatsby
              </Link>
            </Text>
          </footer>
        </Box>
      </ChakraProvider>
    </>
  )
}
