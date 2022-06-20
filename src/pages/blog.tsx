import React from 'react'
import { graphql, Page } from 'gatsby'

import { Layout } from '../components/layout'
import { PostPreviewEdge } from '../components/post'
import { PostsList } from '../components/posts'
import { SectionTitleStyles } from '../components/section-title'
import { SEO } from '../components/seo'

interface BlogPageData extends Page {
  data: {
    allMarkdownRemark: {
      edges: PostPreviewEdge[]
    }
  }
}

const BlogPage = ({ data }: BlogPageData) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="My Blog" />
      <section>
        <SectionTitleStyles>All posts</SectionTitleStyles>

        <PostsList posts={posts} />
      </section>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "posts" } } }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`
