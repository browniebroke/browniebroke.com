import Img, { FixedObject } from 'gatsby-image'
import React from 'react'
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

const Avatar: React.FC<AvatarProps> = ({ sharpImage }) => (
  <AvatarStyles>
    <Img fixed={sharpImage.fixed} />
  </AvatarStyles>
)

export default Avatar
