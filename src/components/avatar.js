import Img from 'gatsby-image'
import React from 'react'
import PropTypes from 'prop-types'
import './avatar.css'

const Avatar = ({ sharpImage, style }) => (
  <div className="avatar" style={style}>
    <Img fluid={sharpImage} />
  </div>
)

export default Avatar

Avatar.propTypes = {
  sharpImage: PropTypes.object,
}
