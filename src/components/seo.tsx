/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

type MetaProps = JSX.IntrinsicElements['meta']

interface SEOProps {
  title: string
  description?: string
  image?: IGatsbyImageData
  lang?: string
  meta?: MetaProps[]
}

const getImageMeta = (
  baseURL: string,
  pageImage?: IGatsbyImageData,
  defaultImage?: IGatsbyImageData
) => {
  const imgPath =
    pageImage?.images?.fallback?.src || defaultImage?.images?.fallback?.src
  if (!imgPath) {
    return []
  }
  const fullImgURL = baseURL + imgPath
  return [
    {
      name: `twitter:image`,
      content: fullImgURL,
    },
    {
      property: `og:image`,
      content: fullImgURL,
    },
  ]
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  meta = [],
  lang = 'en',
}) => {
  const { site, defaultImage } = useStaticQuery(
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
        defaultImage: file(relativePath: { eq: "avatar.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              height: 600
              layout: FIXED
              transformOptions: { fit: COVER, cropFocus: CENTER }
              formats: [PNG]
            )
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const imgMeta = getImageMeta(
    site.siteMetadata.siteUrl,
    image,
    getImage(defaultImage)
  )

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
        ...imgMeta,
      ]}
    />
  )
}
