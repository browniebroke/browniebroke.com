import { graphql, Link } from 'gatsby'
import React from 'react'
import {ReadTimeResults} from 'reading-time'

// @ts-ignore
import { makePostUrl } from '../utils/routes'

export interface PostPreviewData {
  timeToRead: ReadTimeResults
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
    <div>
      <h3>
        <Link to={makePostUrl(post.fields.slug)}>{post.frontmatter.title}</Link>
      </h3>
      <small>
        {post.frontmatter.date} • {post.timeToRead.minutes} min read
      </small>
      <p
        dangerouslySetInnerHTML={{
          __html: post.excerpt,
        }}
      />
    </div>
  )
}

export const postPreviewFragment = graphql`
  fragment FormattedDate on MdxFrontmatter {
    date(formatString: "MMMM DD, YYYY")
  }

  fragment PostPreview on Mdx {
    timeToRead {
      minutes
      text
      time
      words
    }
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
