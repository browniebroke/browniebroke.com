import React from 'react'
import { graphql, Link } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Box } from '@chakra-ui/react'
import { Stack, Tag } from '@chakra-ui/react'

import { Layout } from '../components/layout'
import { Pagination, Page } from '../components/pagination'
import { PostMetaData } from '../components/post-metadata'
import { SEO } from '../components/seo'
import { Sharing } from '../components/sharing'
// @ts-ignore
import { makeTagUrl } from '../utils/routes'

interface PostTemplateData {
  location: {
    pathname: string
  }
  data: {
    markdownRemark: {
      excerpt: string
      html: string
      timeToRead: number
      fileAbsolutePath: string
      frontmatter: {
        title: string
        date: string
        description: string
        tags: string[]
        header_image: IGatsbyImageData
        headerOgImage: IGatsbyImageData
        og_image: IGatsbyImageData
      }
    }
  }
  pageContext: {
    previous: Page
    next: Page
  }
}

const BlogPostTemplate = ({
  location,
  data,
  pageContext,
}: PostTemplateData) => {
  const post = data.markdownRemark
  const headerImage = getImage(post.frontmatter.header_image)
  const ogImage = getImage(post.frontmatter.og_image)
  const headerOgImage = getImage(post.frontmatter.headerOgImage)
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`
  return (
    <Layout headerImage={headerImage}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={ogImage || headerOgImage}
      />
      <h1>{post.frontmatter.title}</h1>

      <PostMetaData
        dateTimeToRead={`${post.frontmatter.date} • ${post.timeToRead} min read`}
        editUrl={editURL}
      />

      <Box dangerouslySetInnerHTML={{ __html: post.html }} />

      <Stack direction="row">
        {post.frontmatter.tags.map((tag, index) => (
          <Link to={makeTagUrl(tag)}>
            <Tag size="md" variant="solid">
              {tag}
            </Tag>
          </Link>
        ))}
      </Stack>
      <Sharing post={post} path={location.pathname} />
      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      fileAbsolutePath
      frontmatter {
        title
        ...FormattedDate
        description
        tags
        header_image {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
        headerOgImage: header_image {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              height: 600
              layout: FIXED
              transformOptions: { fit: COVER, cropFocus: CENTER }
              formats: [PNG]
            )
          }
        }
        og_image {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`
