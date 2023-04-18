import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/layout'
import { Pagination, Page } from '../components/pagination'
import { PostMetaData } from '../components/post-metadata'
import { SEO } from '../components/seo'
import { Sharing } from '../components/sharing'
// @ts-ignore
import { makeTILUrl } from '../utils/routes'
import { Heading } from '@chakra-ui/react'

interface TILTemplateData {
  location: {
    pathname: string
  }
  data: {
    markdownRemark: {
      excerpt: string
      html: string
      fileAbsolutePath: string
      frontmatter: {
        title: string
        date: string
      }
    }
  }
  pageContext: {
    previous: Page
    next: Page
  }
}

const TILTemplate = ({ location, data, pageContext }: TILTemplateData) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Heading as="h1" size="lg">
        {post.frontmatter.title}
      </Heading>

      <PostMetaData dateTimeToRead={post.frontmatter.date} editUrl={editURL} />

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <Sharing post={post} path={location.pathname} />
      <Pagination previous={previous} next={next} makeUrlFunc={makeTILUrl} />
    </Layout>
  )
}

export default TILTemplate

export const pageQuery = graphql`
  query TILBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fileAbsolutePath
      frontmatter {
        title
        ...FormattedDate
        tags
      }
    }
  }
`
