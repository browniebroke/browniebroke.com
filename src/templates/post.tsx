import React from 'react'
import { graphql } from 'gatsby'
import { PageContext } from 'gatsby/internal'
import styled from 'styled-components'
import { ExternalLink, ListInline } from '@browniebroke/react-ui-components'

import Layout from '../components/layout'
import Pagination from '../components/pagination'
import SEO from '../components/seo'
import Sharing from '../components/sharing'
import Tag from '../components/tag'
// @ts-ignore
import { makeTagUrl } from '../utils/routes'
import { FaGithub } from 'react-icons/fa'
import { FixedObject, FluidObject } from 'gatsby-image'

const PostMetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 400px) {
    flex-direction: row;
  }

  div {
    margin-bottom: 0.5rem;
  }
`

interface PostTemplateData {
  location: {
    pathname: string
  }
  data: {
    markdownRemark: {
      excerpt: string
      html: string
      timeToRead: number
      fileAbsolutePath: string
      frontmatter: {
        title: string
        date: string
        description: string
        tags: string[]
        header_image: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        headerOgImage: {
          childImageSharp: {
            fixed: FixedObject
          }
        }
        og_image: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }
  pageContext: PageContext
}

const BlogPostTemplate = ({
  location,
  data,
  pageContext,
}: PostTemplateData) => {
  const post = data.markdownRemark
  const headerImage = post.frontmatter.header_image
  const ogImage = post.frontmatter.og_image
  const headerOgImage = post.frontmatter.headerOgImage
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`

  return (
    <Layout headerImage={headerImage}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          (ogImage && ogImage.childImageSharp.fluid.src) ||
          (headerOgImage && headerOgImage.childImageSharp.fixed.src)
        }
      />
      <h1>{post.frontmatter.title}</h1>

      <PostMetaData>
        <div>
          {post.frontmatter.date} • {post.timeToRead} min read
        </div>
        <div>
          <ExternalLink to={editURL} title="Edit on Github">
            <FaGithub />
            {` `}Edit on Github
          </ExternalLink>
        </div>
      </PostMetaData>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <ListInline padding="0">
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      fileAbsolutePath
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
        headerOgImage: header_image {
          childImageSharp {
            fixed(fit: COVER, width: 1200, height: 600, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
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
