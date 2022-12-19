import React from 'react'
import { graphql, Link, Page } from 'gatsby'
import { FaRssSquare } from 'react-icons/fa'

import { Layout } from '../components/layout'
import { PostPreviewEdge } from '../components/post'
import { PostsList } from '../components/posts'
import { SectionTitleStyles } from '../components/section-title'
import { SEO } from '../components/seo'

interface BlogPageData extends Page {
  data: {
    allMdx: {
      edges: PostPreviewEdge[]
    }
  }
}

const BlogPage = ({ data }: BlogPageData) => {
  const posts = data.allMdx.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="My Blog" />
      <section>
        <SectionTitleStyles>
          All posts
          <Link to="/rss.xml">
            <FaRssSquare />
          </Link>
        </SectionTitleStyles>

        <PostsList posts={posts} />
      </section>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMdx(
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
