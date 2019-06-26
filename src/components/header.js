import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ListInline from './listinline'

const HeaderWrapper = styled.header`
  a {
    text-decoration: none;
  }

  li {
    padding-left: 2rem;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div
      style={{
        padding: `1.5rem 1.5rem`,
        maxWidth: `1300px`,
        margin: `0 auto`,
        display: `flex`,
      }}
    >
      <h2
        style={{
          margin: `0`,
          flexGrow: 1,
          fontSize: `18px`,
          lineHeight: `inherit`,
        }}
      >
        <Link to="/">{siteTitle}</Link>
      </h2>
      <ListInline>
        <li>
          <Link to="/posts/">Posts</Link>
        </li>
      </ListInline>
    </div>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
