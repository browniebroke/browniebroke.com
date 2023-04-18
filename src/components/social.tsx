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
import { Link, Stack } from '@chakra-ui/react'

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
    <Stack direction="row" spacing={4} marginTop={2}>
      <Link
        href="https://fosstodon.org/@browniebroke"
        title="Mastondon profile"
        rel="me"
        isExternal
      >
        <FaMastodon />
      </Link>
      <Link
        href={`https://www.twitter.com/${twitter}`}
        title="Twitter profile"
        isExternal
      >
        <FaTwitter />
      </Link>
      <Link
        href={`https://stackoverflow.com/users/${stackoverflow}`}
        title="Stackoverflow profile"
        isExternal
      >
        <FaStackOverflow />
      </Link>
      <Link
        href={`https://github.com/${github}`}
        title="Github profile"
        isExternal
      >
        <FaGithub title="Github Profile" />
      </Link>
      <Link
        href={`https://gitlab.com/${gitlab}`}
        title="Gitlab Profile"
        isExternal
      >
        <FaGitlab />
      </Link>
      <Link
        href={`https://medium.com/@${medium}`}
        title="Medium Profile"
        isExternal
      >
        <FaMedium />
      </Link>
    </Stack>
  )
}
