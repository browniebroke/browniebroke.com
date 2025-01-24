import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/layout'
import { Pagination, Page } from '../components/pagination'
import { PostMetaData } from '../components/post-metadata'
import { SEO } from '../components/seo'
import { Sharing } from '../components/sharing'
// @ts-ignore
import { makeTILUrl } from '../utils/routes'
import { MDXWrapper } from '../components/mdx-wrapper'
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface TILTemplateData {
  location: {
    pathname: string
  }
  data: {
    mdx: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        date: string
        og_image: IGatsbyImageData
      }
      parent: {
        absolutePath: string
      }
    }
  }
  pageContext: {
    previous: Page
    next: Page
  }
  children: React.ReactNode
}

const TILTemplate = ({ data, pageContext, children }: TILTemplateData) => {
  const post = data.mdx
  const { previous, next } = pageContext
  const editURL = `https://github.com/browniebroke/browniebroke.com/blob/master/src/${
    post.parent.absolutePath.split('/src/')[1]
  }`
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={post.frontmatter.og_image}
      />
      <h1 className="text-3xl font-bold mt-8 mb-4">{post.frontmatter.title}</h1>

      <PostMetaData dateTimeToRead={post.frontmatter.date} editUrl={editURL} />

      <MDXWrapper>
        <div>{children}</div>
      </MDXWrapper>

      <Sharing post={post} path={makeTILUrl(post.fields.slug)} />
      <Pagination previous={previous} next={next} makeUrlFunc={makeTILUrl} />
    </Layout>
  )
}

export default TILTemplate

export const pageQuery = graphql`
  query TILBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      frontmatter {
        title
        ...FormattedDate
        tags
        og_image {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
      parent {
        ... on File {
          absolutePath
        }
      }
    }
  }
`
