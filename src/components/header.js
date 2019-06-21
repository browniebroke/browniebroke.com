import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header>
    <div
      style={{
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h2 style={{ margin: `0`, fontSize: `18px` }}>
        <Link to="/" style={{ textDecoration: `none` }}>
          {siteTitle}
        </Link>
      </h2>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
