import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled, { ThemeProvider, css } from 'styled-components'
import { ExternalLink } from '@browniebroke/react-ui-components'

import { Header } from './header'
import { GlobalStyle } from './global-style'
import { theme } from '../utils/theme'

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 0px 1rem 1.5rem;
  padding-top: 3rem;
  min-height: 100vh;
`

const Main = styled.main`
  min-height: 70vh;
`

const HeroImageWrapper = styled.div<{ headerColor?: string }>`
  padding: 3rem;
  text-align: center;
  max-height: 50vh;
  ${(props) =>
    props.headerColor &&
    css`
      background-color: ${props.headerColor};
    `};
`

const SmallText = styled.span`
  font-size: 0.7em;
`

interface LayoutProps {
  children?: React.ReactNode
  headerImage?: IGatsbyImageData
  headerBgColor?: string
}

const getHeroImage = (heroImage?: IGatsbyImageData, headerColor?: string) => {
  if (heroImage) {
    return (
      <HeroImageWrapper headerColor={headerColor}>
        <GatsbyImage image={heroImage} alt="" />
      </HeroImageWrapper>
    )
  }
}

export const Layout: React.FC<LayoutProps> = ({
  headerImage,
  headerBgColor,
  children,
}) => {
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
        <GlobalStyle />
        {getHeroImage(headerImage, headerBgColor)}
        <ContentWrapper>
          <Main>{children}</Main>
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
