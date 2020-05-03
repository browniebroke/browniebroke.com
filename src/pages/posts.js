import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostsList from '../components/posts'
import SectionTitleStyles from '../components/section-title'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="All my blog posts" />
      <section>
        <SectionTitleStyles>All posts</SectionTitleStyles>

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
