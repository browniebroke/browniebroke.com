import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { ThemeProvider } from 'styled-components'
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

const getHeroImage = (fluidImage) => {
  if (fluidImage) {
    return (
      <HeroImageWrapper>
        <Img fluid={fluidImage.childImageSharp.fluid} />
      </HeroImageWrapper>
    )
  }
}

const Layout = ({ children, headerImage }) => {
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

Layout.defaultProps = {
  headerImage: null,
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerImage: PropTypes.object,
}

export default Layout
