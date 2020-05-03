import React from 'react'
import styled from 'styled-components'

const ListInlineStyle = styled.ul`
  list-style: none;
  margin: 0;
`

const ListItemStyle = styled.li`
  margin-bottom: 0;
  display: inline-block;
  padding: 0 0.5rem;
`

const ListInline = ({ children }) => {
  return (
    <ListInlineStyle>
      {React.Children.map(children, (child, i) => (
        <ListItemStyle key={i}>{child}</ListItemStyle>
      ))}
    </ListInlineStyle>
  )
}

export default ListInline
