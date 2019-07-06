import Img from 'gatsby-image'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  max-width: ${props => `${props.width}px;`}
  padding: 1rem;

  img {
    padding: 5px;
    border: 1px solid #51555d;
    border-radius: 50%;
  }
  ${props =>
    props.centered &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
`

const Avatar = ({ sharpImage, centered, width }) => (
  <Wrapper centered={centered} width={width}>
    <Img fluid={sharpImage} />
  </Wrapper>
)

Avatar.defaultProps = {
  centered: false,
}

Avatar.propTypes = {
  sharpImage: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  centered: PropTypes.boolean,
}

export default Avatar
