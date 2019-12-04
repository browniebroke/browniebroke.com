import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ListInline from './list-inline'

const HeaderWrapper = styled.header`
  box-shadow: rgba(29, 33, 41, 0.15) 0px 30px 20px -32px;

  a {
    text-decoration: none;
  }

  li {
    padding-left: 2rem;
  }
`

const HeaderContent = styled.div`
  padding: 1.5rem 1.5rem;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
`

const SiteTitle = styled.h2`
  margin: 0;
  flex-grow: 1;
  font-size: 18px;
  line-height: inherit;
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContent>
      <SiteTitle>
        <Link to="/">{siteTitle}</Link>
      </SiteTitle>
      <ListInline>
        <li>
          <Link to="/posts/">Posts</Link>
        </li>
      </ListInline>
    </HeaderContent>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
