import {
  FaGithub,
  FaGitlab,
  FaMedium,
  FaStackOverflow,
  FaTwitter,
} from 'react-icons/fa'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// @ts-ignore
import { ExternalLink, ListInline } from '@browniebroke/react-ui-components'

const SocialLinks = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            github
            gitlab
            medium
            stackoverflow
            twitter
          }
        }
      }
    }
  `)

  const {
    github,
    gitlab,
    medium,
    twitter,
    stackoverflow,
  } = site.siteMetadata.social

  return (
    <ListInline>
      <ExternalLink
        to={`https://www.twitter.com/${twitter}`}
        title="Twitter profile"
      >
        <FaTwitter />
      </ExternalLink>
      <ExternalLink
        to={`https://stackoverflow.com/users/${stackoverflow}`}
        title="Stackoverflow profile"
      >
        <FaStackOverflow />
      </ExternalLink>
      <ExternalLink to={`https://github.com/${github}`} title="Github profile">
        <FaGithub title="Github Profile" />
      </ExternalLink>
      <ExternalLink to={`https://gitlab.com/${gitlab}`} title="Gitlab Profile">
        <FaGitlab />
      </ExternalLink>
      <ExternalLink to={`https://medium.com/@${medium}`} title="Medium Profile">
        <FaMedium />
      </ExternalLink>
    </ListInline>
  )
}

export default SocialLinks
