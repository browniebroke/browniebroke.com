import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Avatar from '../components/avatar'
import PostsList from '../components/posts'
import SocialLinks from '../components/social'

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem;
  padding-top: 0;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection>
        <h1>Bruno Alla's Blog</h1>
        <Avatar
          sharpImage={data.avatarImage.childImageSharp.fluid}
          centered={true}
          width={200}
        />
        <p>
          Hi! I'm a web developer based in London, I work mostly with Python &
          Django, but I also do a bit of Javascript on the side, mainly with
          Gatsby.
        </p>
        <SocialLinks />
      </HeroSection>
      <section>
        <h2 style={{ textAlign: `center`, marginBottom: `3rem` }}>
          Most recent posts
        </h2>

        <PostsList posts={posts} />

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
          ...PostPreview
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
