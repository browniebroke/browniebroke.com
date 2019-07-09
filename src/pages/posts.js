import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostsList from '../components/posts'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="All my blog posts" />
      <section>
        <h2 style={{ textAlign: `center`, marginBottom: `3rem` }}>All posts</h2>

        <PostsList posts={posts} />
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`
