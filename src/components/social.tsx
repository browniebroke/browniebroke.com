import {
  FaGithub,
  FaGitlab,
  FaMastodon,
  FaMedium,
  FaStackOverflow,
  FaTwitter,
} from 'react-icons/fa'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ExternalLink } from '@browniebroke/react-ui-components'
import { Stack } from '@chakra-ui/react'

export const SocialLinks: React.FC = () => {
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

  const { github, gitlab, medium, twitter, stackoverflow } =
    site.siteMetadata.social

  return (
    <Stack direction="row">
      <ExternalLink
        to="https://fosstodon.org/@browniebroke"
        title="Mastondon profile"
        rel="me"
      >
        <FaMastodon />
      </ExternalLink>
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
    </Stack>
  )
}
