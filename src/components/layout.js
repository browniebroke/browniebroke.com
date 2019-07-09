import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Header from './header'

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

function getHeroImage(fluidImage) {
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
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      {getHeroImage(headerImage)}
      <ContentWrapper>
        <main>{children}</main>
        <footer>
          <SmallText>
            © {new Date().getFullYear()}, Built with{` `}
            <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener">
              Gatsby
            </a>
          </SmallText>
        </footer>
      </ContentWrapper>
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
