import { graphql, Link } from 'gatsby'
import React from 'react'

// @ts-ignore
import { makePostUrl } from '../utils/routes'
import { Box, Heading, Text } from '@chakra-ui/react'

export interface PostPreviewData {
  timeToRead: number
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    title: string
  }
}

export interface PostPreviewEdge {
  node: PostPreviewData
}

interface PostPreviewProp {
  post: PostPreviewData
}

export const PostPreview: React.FC<PostPreviewProp> = ({ post }) => {
  return (
    <Box marginBottom={8}>
      <Heading as="h3" size="md">
        <Link to={makePostUrl(post.fields.slug)}>{post.frontmatter.title}</Link>
      </Heading>
      <small>
        {post.frontmatter.date} • {post.timeToRead} min read
      </small>
      <Text
        dangerouslySetInnerHTML={{
          __html: post.excerpt,
        }}
      />
    </Box>
  )
}

export const postPreviewFragment = graphql`
  fragment FormattedDate on MarkdownRemarkFrontmatter {
    date(formatString: "MMMM DD, YYYY")
  }

  fragment PostPreview on MarkdownRemark {
    timeToRead
    excerpt
    fields {
      slug
    }
    frontmatter {
      ...FormattedDate
      title
    }
  }
`
