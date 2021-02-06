import { graphql, Link } from 'gatsby'
import React from 'react'

// @ts-ignore
import { makePostUrl } from '../utils/routes'

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

const PostPreview: React.FC<PostPreviewProp> = ({ post }) => {
  return (
    <div>
      <h3>
        <Link to={makePostUrl(post.fields.slug)}>{post.frontmatter.title}</Link>
      </h3>
      <small>
        {post.frontmatter.date} • {post.timeToRead} min read
      </small>
      <p
        dangerouslySetInnerHTML={{
          __html: post.excerpt,
        }}
      />
    </div>
  )
}

export default PostPreview

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
