import React from 'react'
import { Link, graphql } from 'gatsby'
import { Box, Heading, Text } from '@chakra-ui/react'

import { Avatar } from '../components/avatar'
import { Layout } from '../components/layout'
import { PostPreviewEdge } from '../components/post'
import { PostsList } from '../components/posts'
import { SectionTitle } from '../components/section-title'
import { SeeMoreStyles } from '../components/see-more'
import { SEO } from '../components/seo'
import { SocialLinks } from '../components/social'

interface IndexPageData {
  data: {
    allMdx: {
      edges: PostPreviewEdge[]
    }
  }
}

const IndexPage = ({ data }: IndexPageData) => {
  const posts = data.allMdx.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="Home" />
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading as="h1">Bruno Alla</Heading>
        <Avatar />
        <Text textAlign="center" maxWidth="400px">
          Hi! I'm a web developer based in London, I work mostly with Python &
          Django, but I also do a bit of Javascript on the side, mainly with
          Gatsby.
        </Text>
        <SocialLinks />
      </Box>
      <section>
        <SectionTitle>Most recent posts</SectionTitle>

        <PostsList posts={posts} />

        <SeeMoreStyles>
          <Link to="/blog/">See more...</Link>
        </SeeMoreStyles>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 3
      sort: { frontmatter: { date: DESC } }
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
