import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import '../styles/global.css'

import { Header } from './header'
import { AcceptsChildren } from './types'

interface LayoutProps extends AcceptsChildren {
  headerImage?: IGatsbyImageData
}

const getHeroImage = (heroImage?: IGatsbyImageData) => {
  if (heroImage) {
    return (
      <div className="p-0">
        <GatsbyImage image={heroImage} alt="" />
      </div>
    )
  }
}

export const Layout = ({ headerImage, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      {getHeroImage(headerImage)}
      <div className="container mx-auto pt-12 pb-6 px-4 max-w-xl min-h-screen">
        <main className="min-h-[70vh]">{children}</main>
        <footer>
          <span className="text-[0.7em]">
            © {new Date().getFullYear()}, Built with{` `}
            <a
              href="https://www.gatsbyjs.org"
              title="GatsbyJS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gatsby
            </a>
          </span>
        </footer>
      </div>
    </>
  )
}
