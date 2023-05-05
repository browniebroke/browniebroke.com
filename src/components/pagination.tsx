import React from 'react'
import { Link } from 'gatsby'
import { Button, Spacer, Stack } from '@chakra-ui/react'

// @ts-ignore
import { makePostUrl } from '../utils/routes'

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
    <>
      {pageObj ? (
        <Button as="div" variant="outline" size="sm">
          <Link
            to={makeUrl(pageObj.fields.slug)}
            rel={rel}
            title={pageObj.frontmatter.title}
          >
            {label}
          </Link>
        </Button>
      ) : (
        <Spacer />
      )}
    </>
  )
}

export const Pagination: React.FC<PaginationProps> = ({
  previous = null,
  next = null,
  makeUrlFunc = null,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      marginY={6}
    >
      <PageLink pageObj={previous} rel="prev" makeUrlFunc={makeUrlFunc} />
      <PageLink pageObj={next} rel="next" makeUrlFunc={makeUrlFunc} />
    </Stack>
  )
}
