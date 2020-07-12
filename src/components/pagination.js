import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { makePostUrl } from '../utils/routes'

const PaginationStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
`

const PageLink = ({ pageObj, rel }) => {
  let label = ''
  switch (rel) {
    case 'prev':
      label = '← Previous'
      break
    case 'next':
      label = 'Next →'
      break
    default:
      label = ''
  }
  return (
    <li>
      {pageObj && (
        <Link
          to={makePostUrl(pageObj.fields.slug)}
          rel={rel}
          title={pageObj.frontmatter.title}
        >
          {label}
        </Link>
      )}
    </li>
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
