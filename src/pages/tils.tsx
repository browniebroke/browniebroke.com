import React from 'react'
import { graphql, Link, Page } from 'gatsby'

import { Layout } from '../components/layout'
import { SectionTitle } from '../components/section-title'
import { SEO } from '../components/seo'
// @ts-ignore
import { makeTILUrl } from '../utils/routes'
import { FaRssSquare } from 'react-icons/fa'

interface TIL {
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    simpleDate: string
    title: string
  }
}

interface TILEdge {
  node: TIL
}

interface TILIndexPageData extends Page {
  data: {
    allMdx: {
      edges: TILEdge[]
    }
  }
}

const TILIndexPage = ({ data }: TILIndexPageData) => {
  const tils = data.allMdx.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="TIL" />
      <section>
        <SectionTitle>
          TIL
          <Link to="/tils.xml">
            <FaRssSquare />
          </Link>
        </SectionTitle>
        <p>Things I've learned.</p>
        {tils.map((til) => (
          <div>
            <Link to={makeTILUrl(til.fields.slug)} className="inherit-color">
              <h3 className="text font-bold mt-4">
                {til.frontmatter.simpleDate} {til.frontmatter.title}
              </h3>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default TILIndexPage

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { sourceName: { eq: "tils" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            ...FormattedDate
            simpleDate: date(formatString: "YYYY-DD-MM")
            title
          }
        }
      }
    }
  }
`
