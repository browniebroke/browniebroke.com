import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ListInline from '../components/list-inline'
import Pagination from '../components/pagination'
import SEO from '../components/seo'
import Sharing from '../components/sharing'
import Tag from '../components/tag'
import { makeTagUrl } from '../utils/routes'

const BlogPostTemplate = ({ location, data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const headerImage = post.frontmatter.header_image
  const ogImage = post.frontmatter.og_image
  const { previous, next } = pageContext
  console.log(location)

  return (
    <Layout title={siteTitle} headerImage={headerImage}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          (ogImage && ogImage.childImageSharp.fluid.src) ||
          (headerImage && headerImage.childImageSharp.fluid.src)
        }
      />
      <h1>{post.frontmatter.title}</h1>
      <p>
        {post.frontmatter.date} • {post.timeToRead} min read
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <ListInline compact={true}>
        {post.frontmatter.tags.map((tag, index) => (
          <Tag to={makeTagUrl(tag)} key={index}>
            {tag}
          </Tag>
        ))}
      </ListInline>

      <Sharing post={post} path={location.pathname} />
      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        ...FormattedDate
        description
        tags
        header_image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        og_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
