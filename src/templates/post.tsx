import React from 'react'
import { graphql, Link } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Box, Heading, Stack } from '@chakra-ui/react'

import { Layout } from '../components/layout'
import { MDXWrapper } from '../components/mdx-wrapper'
import { Pagination, Page } from '../components/pagination'
import { PostMetaData } from '../components/post-metadata'
import { SEO } from '../components/seo'
import { Sharing } from '../components/sharing'
// @ts-ignore
import { makePostUrl, makeTagUrl } from '../utils/routes'
import { Tag } from '../components/ui/tag'

interface PostTemplateData {
  location: {
    pathname: string
  }
  data: {
    mdx: {
      excerpt: string
      fields: {
        slug: string
        timeToRead: {
          text: string
        }
      }
      parent: {
        absolutePath: string
      }
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
  children: React.ReactNode
}

const BlogPostTemplate = ({
  data,
  pageContext,
  children,
}: PostTemplateData) => {
  const post = data.mdx
  const headerImage = getImage(post.frontmatter.header_image)
  const ogImage = getImage(post.frontmatter.og_image)
  const headerOgImage = getImage(post.frontmatter.headerOgImage)
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.parent.absolutePath.split('/src/')[1]
  }`
  return (
    <Layout headerImage={headerImage}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={ogImage || headerOgImage}
      />
      <Heading as="h1" size="lg">
        {post.frontmatter.title}
      </Heading>

      <PostMetaData
        dateTimeToRead={`${post.frontmatter.date} • ${post.fields.timeToRead.text}`}
        editUrl={editURL}
      />

      <MDXWrapper>
        <Box>{children}</Box>
      </MDXWrapper>

      <Stack direction="row">
        {post.frontmatter.tags.map((tag) => (
          <Link to={makeTagUrl(tag)} key={tag}>
            <Tag size="md" variant="solid">
              {tag}
            </Tag>
          </Link>
        ))}
      </Stack>
      <Sharing post={post} path={makePostUrl(post.fields.slug)} />
      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
        timeToRead {
          text
        }
      }
      parent {
        ... on File {
          absolutePath
        }
      }
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
