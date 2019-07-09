import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;

  li {
    margin-bottom: 0;
    display: inline-block;
    padding: 0 0.5rem;
  }
`

const ListInline = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ListInline
