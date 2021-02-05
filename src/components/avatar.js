import Img from 'gatsby-image'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AvatarStyles = styled.div`
  padding: 1rem;

  img {
    padding: 5px;
    border: 1px solid #51555d;
    border-radius: 50%;
  }
`

const Avatar = ({ sharpImage }) => (
  <AvatarStyles>
    <Img fixed={sharpImage.fixed} />
  </AvatarStyles>
)

Avatar.propTypes = {
  sharpImage: PropTypes.object.isRequired,
}

export default Avatar
