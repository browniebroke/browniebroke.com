import { graphql, Link } from 'gatsby'
import React from 'react'

// @ts-ignore
import { makePostUrl } from '../utils/routes'

interface PostPreviewProp {
  title: string
  slug: string
  date: string
  timeToRead: number
  excerpt: string
}

const PostPreview: React.FC<PostPreviewProp> = ({
  title,
  slug,
  date,
  timeToRead,
  excerpt,
}) => {
  return (
    <div>
      <h3>
        <Link to={makePostUrl(slug)}>{title}</Link>
      </h3>
      <small>
        {date} • {timeToRead} min read
      </small>
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
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
