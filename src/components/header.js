import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ListInline from './list-inline'

const HeaderWrapperStyles = styled.header`
  box-shadow: rgba(29, 33, 41, 0.15) 0px 30px 20px -32px;

  a {
    text-decoration: none;
  }

  li {
    padding-left: 2rem;
  }
`

const HeaderStyles = styled.div`
  padding: 1.5rem 1.5rem;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
`

const TitleStyles = styled.h2`
  margin: 0;
  flex-grow: 1;
  font-size: 18px;
  line-height: inherit;
`

const Header = ({ siteTitle }) => (
  <HeaderWrapperStyles>
    <HeaderStyles>
      <TitleStyles>
        <Link to="/">{siteTitle}</Link>
      </TitleStyles>
      <ListInline>
        <Link to="/blog/">Blog</Link>
      </ListInline>
    </HeaderStyles>
  </HeaderWrapperStyles>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
