import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostsList from '../components/posts'

const TagPageTemplate = ({ data, location, pageContext }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)
  const title = `Tag "${pageContext.tag}"`

  return (
    <Layout location={location} title={title}>
      <SEO
        title={title}
        description={`List of all posts tagged as "${pageContext.tag}"`}
      />
      <section>
        <h1>{`Posts tagged as "${pageContext.tag}"`}</h1>

        <PostsList posts={posts} />

        <p style={{ textAlign: `center`, marginTop: `3rem` }}>
          <Link to="/posts/">See all posts...</Link>
        </p>
      </section>
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagBySlug($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`
