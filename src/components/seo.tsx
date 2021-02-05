/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaProps = JSX.IntrinsicElements['meta']

interface SEOProps {
  description: string
  lang: string
  meta: MetaProps[]
  title: string
  image: string
}

const SEO: React.FC<SEOProps> = ({
  description,
  lang = 'en',
  meta = [],
  title,
  image,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  let metaImage: Iterable<MetaProps> = []
  if (image) {
    const fullUrl = `${site.siteMetadata.siteUrl}${image}`
    metaImage = [
      {
        name: `twitter:image`,
        content: fullUrl,
      },
      {
        property: `og:image`,
        content: fullUrl,
      },
    ]
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta,
        ...metaImage,
      ]}
    />
  )
}

export default SEO
