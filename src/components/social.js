import { FaGithub, FaStackOverflow, FaTwitter } from 'react-icons/fa'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListInline from './list-inline'

const SocialLinks = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            twitter
            stackoverflow
            github
          }
        }
      }
    }
  `)

  const { twitter, stackoverflow, github } = site.siteMetadata.social

  return (
    <ListInline>
      <li>
        <a
          href={`https://www.twitter.com/${twitter}`}
          target="_blank"
          rel="noopener"
        >
          <FaTwitter title="Twitter Profile" />
        </a>
      </li>
      <li>
        <a
          href={`https://stackoverflow.com/users/${stackoverflow}`}
          target="_blank"
          rel="noopener"
        >
          <FaStackOverflow title="Stackoverflow Profile" />
        </a>
      </li>
      <li>
        <a href={`https://github.com/${github}`} target="_blank" rel="noopener">
          <FaGithub title="Github Profile" />
        </a>
      </li>
    </ListInline>
  )
}

export default SocialLinks
