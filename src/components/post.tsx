import { graphql, Link } from 'gatsby'
import React from 'react'

// @ts-ignore
import { makePostUrl } from '../utils/routes'

export interface PostPreviewData {
  excerpt: string
  fields: {
    slug: string
    timeToRead: {
      text: string
    }
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
    <article className="mb-8">
      <h3 className="text-xl font-bold">
        <Link to={makePostUrl(post.fields.slug)} className="inherit-color">
          {post.frontmatter.title}
        </Link>
      </h3>
      <small>
        {post.frontmatter.date} • {post.fields.timeToRead.text}
      </small>
      <div
        dangerouslySetInnerHTML={{
          __html: post.excerpt,
        }}
      />
    </article>
  )
}

export const postPreviewFragment = graphql`
  fragment FormattedDate on MdxFrontmatter {
    date(formatString: "MMMM DD, YYYY")
  }

  fragment PostPreview on Mdx {
    excerpt
    fields {
      slug
      timeToRead {
        text
      }
    }
    frontmatter {
      ...FormattedDate
      title
    }
  }
`
