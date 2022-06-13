import { Link } from 'gatsby'
import styled from 'styled-components'

export const Tag = styled(Link)`
  font-size: 0.8em;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 10px 0 0;
  background: #5f5f5f;
  color: #fff;
  text-decoration: none;

  :hover {
    color: #fff;
    background: #000;
  }
`
