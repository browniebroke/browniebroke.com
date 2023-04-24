import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/layout'
import { Pagination, Page } from '../components/pagination'
import { PostMetaData } from '../components/post-metadata'
import { SEO } from '../components/seo'
import { Sharing } from '../components/sharing'
// @ts-ignore
import { makeTILUrl } from '../utils/routes'
import { Box, Heading } from '@chakra-ui/react'
import { MDXWrapper } from '../components/mdx-wrapper'

interface TILTemplateData {
  location: {
    pathname: string
  }
  data: {
    mdx: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        date: string
      }
      parent: {
        absolutePath: string
      }
    }
  }
  pageContext: {
    previous: Page
    next: Page
  }
  children: React.ReactNode
}

const TILTemplate = ({ data, pageContext, children }: TILTemplateData) => {
  const post = data.mdx
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.parent.absolutePath.split('/src/')[1]
  }`
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Heading as="h1" size="lg">
        {post.frontmatter.title}
      </Heading>

      <PostMetaData dateTimeToRead={post.frontmatter.date} editUrl={editURL} />

      <MDXWrapper>
        <Box>{children}</Box>
      </MDXWrapper>

      <Sharing post={post} path={makeTILUrl(post.fields.slug)} />
      <Pagination previous={previous} next={next} makeUrlFunc={makeTILUrl} />
    </Layout>
  )
}

export default TILTemplate

export const pageQuery = graphql`
  query TILBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      frontmatter {
        title
        ...FormattedDate
        tags
      }
      parent {
        ... on File {
          absolutePath
        }
      }
    }
  }
`
