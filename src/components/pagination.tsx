import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
// @ts-ignore
import { makePostUrl } from '../utils/routes'

const PaginationStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
`

export interface Page {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface PageLinkProps {
  pageObj: Page | null
  rel: 'prev' | 'next'
}

interface PaginationProps {
  previous: Page | null
  next: Page | null
}

const PageLink: React.FC<PageLinkProps> = ({ pageObj, rel }) => {
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

const Pagination: React.FC<PaginationProps> = ({
  previous = null,
  next = null,
}) => {
  return (
    <PaginationStyles>
      <PageLink pageObj={previous} rel="prev" />
      <PageLink pageObj={next} rel="next" />
    </PaginationStyles>
  )
}

export default Pagination
