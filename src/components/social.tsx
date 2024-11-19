import {
  FaGithub,
  FaGitlab,
  FaMastodon,
  FaMedium,
  FaStackOverflow,
  FaTwitter,
} from 'react-icons/fa'
import { FaBluesky, FaThreads } from 'react-icons/fa6'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link, Stack } from '@chakra-ui/react'

export const SocialLinks: React.FC = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            bsky
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

  const { bsky, github, gitlab, medium, twitter, stackoverflow } =
    site.siteMetadata.social

  return (
    <Stack direction="row" gap={2} marginTop={2}>
      <Link
        href="https://fosstodon.org/@browniebroke"
        title="Mastondon profile"
        target="_blank"
        rel="me noopener noreferrer"
      >
        <FaMastodon />
      </Link>
      <Link
        href={`https://bsky.app/profile/${bsky}`}
        title="Bluesky profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaBluesky />
      </Link>
      <Link
        href={`https://www.threads.net/@browniebroke}`}
        title="Threads profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaThreads />
      </Link>
      <Link
        href={`https://www.twitter.com/${twitter}`}
        title="Twitter profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter />
      </Link>
      <Link
        href={`https://stackoverflow.com/users/${stackoverflow}`}
        title="Stackoverflow profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaStackOverflow />
      </Link>
      <Link
        href={`https://github.com/${github}`}
        title="Github profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub title="Github Profile" />
      </Link>
      <Link
        href={`https://gitlab.com/${gitlab}`}
        title="Gitlab Profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGitlab />
      </Link>
      <Link
        href={`https://medium.com/@${medium}`}
        title="Medium Profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaMedium />
      </Link>
    </Stack>
  )
}
