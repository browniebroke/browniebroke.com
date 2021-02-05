import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import styled, { ThemeProvider } from 'styled-components'
// @ts-ignore
import { ExternalLink } from '@browniebroke/react-ui-components'

import Header from './header'
import theme from '../utils/theme'

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 0px 1rem 1.5rem;
  padding-top: 3rem;
  min-height: 100vh;
`

const HeroImageWrapper = styled.div`
  padding: 0;
`

const SmallText = styled.span`
  font-size: 0.7em;
`

interface HeaderImage {
  childImageSharp: {
    fluid: FluidObject
  }
}

interface LayoutProps {
  children: React.ReactNode
  headerImage: HeaderImage
}

const getHeroImage = (fluidImage: HeaderImage) => {
  if (fluidImage) {
    return (
      <HeroImageWrapper>
        <Img fluid={fluidImage.childImageSharp.fluid} />
      </HeroImageWrapper>
    )
  }
}

const Layout: React.FC<LayoutProps> = ({ headerImage, children }) => {
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
      <ThemeProvider theme={theme}>
        <Header siteTitle={data.site.siteMetadata.title} />
        {getHeroImage(headerImage)}
        <ContentWrapper>
          <main>{children}</main>
          <footer>
            <SmallText>
              © {new Date().getFullYear()}, Built with{` `}
              <ExternalLink to="https://www.gatsbyjs.org" title="GatsbyJS">
                Gatsby
              </ExternalLink>
            </SmallText>
          </footer>
        </ContentWrapper>
      </ThemeProvider>
    </>
  )
}

export default Layout
