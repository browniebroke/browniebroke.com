import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const AvatarStyles = styled.div`
  padding: 1rem;

  img {
    padding: 5px;
    border: 1px solid #51555d;
    border-radius: 50%;
  }
`

export const Avatar: React.FC = () => (
  <AvatarStyles>
    <StaticImage
      src="../assets/avatar.jpg"
      alt="Picture of Bruno"
      placeholder="blurred"
      layout="fixed"
      width={160}
      height={160}
    />
  </AvatarStyles>
)
