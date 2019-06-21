import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Avatar from '../components/avatar'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" />
      <section
        style={{
          textAlign: `center`,
          padding: `5rem`,
          paddingTop: 0,
        }}
      >
        <h1>Hi</h1>
        <Avatar
          sharpImage={data.avatarImage.childImageSharp.fluid}
          style={{ marginLeft: `auto`, marginRight: `auto` }}
        />
        <p>
          I'm a web developer based in London, I work mostly with Python &
          Django but find some interest in Gatsby for simpler project. I like
          rugby, electronic music & food. I'm French.
        </p>
      </section>
      <section>
        <h2 style={{ textAlign: `center`, marginBottom: `3rem` }}>
          Most recent posts
        </h2>

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          )
        })}

        <p style={{ textAlign: `center`, marginTop: `3rem` }}>
          <Link to="/posts/">See more...</Link>
        </p>
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
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
          }
        }
      }
    }
    avatarImage: file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
