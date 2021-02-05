import Img, { FixedObject } from 'gatsby-image'
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

interface AvatarProps {
  sharpImage: {
    fixed: FixedObject
  }
}

const Avatar = (props: AvatarProps) => (
  <AvatarStyles>
    <Img fixed={props.sharpImage.fixed} />
  </AvatarStyles>
)

Avatar.propTypes = {
  sharpImage: PropTypes.object.isRequired,
}

export default Avatar
