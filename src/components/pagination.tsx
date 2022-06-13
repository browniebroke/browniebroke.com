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
  makeUrlFunc: Function | null
}

interface PaginationProps {
  previous: Page | null
  next: Page | null
  makeUrlFunc?: (slug: string) => string
}

const PageLink: React.FC<PageLinkProps> = ({ pageObj, rel, makeUrlFunc }) => {
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
  const makeUrl = makeUrlFunc !== null ? makeUrlFunc : makePostUrl
  return (
    <li>
      {pageObj && (
        <Link
          to={makeUrl(pageObj.fields.slug)}
          rel={rel}
          title={pageObj.frontmatter.title}
        >
          {label}
        </Link>
      )}
    </li>
  )
}

export const Pagination: React.FC<PaginationProps> = ({
  previous = null,
  next = null,
  makeUrlFunc = null,
}) => {
  return (
    <PaginationStyles>
      <PageLink pageObj={previous} rel="prev" makeUrlFunc={makeUrlFunc} />
      <PageLink pageObj={next} rel="next" makeUrlFunc={makeUrlFunc} />
    </PaginationStyles>
  )
}
