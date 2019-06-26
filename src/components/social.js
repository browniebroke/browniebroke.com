import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListInline from './listinline'

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
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
      <li>
        <a
          href={`https://stackoverflow.com/users/${stackoverflow}`}
          target="_blank"
          rel="noopener"
        >
          <FontAwesomeIcon icon={faStackOverflow} />
        </a>
      </li>
      <li>
        <a href={`https://github.com/${github}`} target="_blank" rel="noopener">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>
    </ListInline>
  )
}

export default SocialLinks
