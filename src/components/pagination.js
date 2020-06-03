import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { makePostUrl } from '../utils/routes'

const PaginationStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
`

const PageLink = ({ pageObj, rel }) => {
  const prefix = rel === 'prev' ? '← ' : ''
  const suffix = rel === 'next' ? ' →' : ''
  return (
    pageObj && (
      <li>
        <Link to={makePostUrl(pageObj.fields.slug)} rel={rel}>
          {`${prefix}${pageObj.frontmatter.title}${suffix}`}
        </Link>
      </li>
    )
  )
}

const Pagination = ({ previous = null, next = null }) => {
  return (
    <PaginationStyles>
      <PageLink pageObj={previous} rel="prev" />
      <PageLink pageObj={next} rel="next" />
    </PaginationStyles>
  )
}

export default Pagination
