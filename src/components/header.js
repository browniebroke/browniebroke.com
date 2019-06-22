import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header>
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
      <ul className="list-inline">
        <li>
          <Link to="/posts/">Posts</Link>
        </li>
      </ul>
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
