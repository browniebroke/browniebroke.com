import React from 'react'
import { Link, graphql } from 'gatsby'
import { PageContext } from 'gatsby/internal'

import Layout from '../components/layout'
import PostsList from '../components/posts'
import SeeMoreStyles from '../components/see-more'
import SEO from '../components/seo'
import { PostPreviewEdge } from '../components/post'

interface TagPageData {
  data: {
    allMarkdownRemark: {
      edges: PostPreviewEdge[]
    }
  }
  pageContext: PageContext
}

const TagPageTemplate = ({ data, pageContext }: TagPageData) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)
  const title = `Tag "${pageContext.tag}"`

  return (
    <Layout>
      <SEO
        title={title}
        description={`List of all posts tagged as "${pageContext.tag}"`}
      />
      <section>
        <h1>{`Posts tagged as "${pageContext.tag}"`}</h1>

        <PostsList posts={posts} />

        <SeeMoreStyles>
          <Link to="/blog/">See all posts...</Link>
        </SeeMoreStyles>
      </section>
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagBySlug($tag: String!) {
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
