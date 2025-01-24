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

export const SocialLinks: React.FC = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            bsky
            github
            gitlab
            mastodon
            medium
            stackoverflow
            twitter
          }
        }
      }
    }
  `)

  const { bsky, github, gitlab, mastodon, medium, twitter, stackoverflow } =
    site.siteMetadata.social

  return (
    <div className="flex flex-row gap-2 mt-2">
      <a
        href={`https://fosstodon.org/${mastodon}`}
        title="Mastondon profile"
        rel="me"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaMastodon />
      </a>
      <a
        href={`https://bsky.app/profile/${bsky}`}
        title="Bluesky profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaBluesky />
      </a>
      <a
        href={`https://www.threads.net/@browniebroke}`}
        title="Threads profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaThreads />
      </a>
      <a
        href={`https://www.twitter.com/${twitter}`}
        title="Twitter profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://stackoverflow.com/users/${stackoverflow}`}
        title="Stackoverflow profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaStackOverflow />
      </a>
      <a
        href={`https://github.com/${github}`}
        title="Github profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaGithub title="Github Profile" />
      </a>
      <a
        href={`https://gitlab.com/${gitlab}`}
        title="Gitlab Profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaGitlab />
      </a>
      <a
        href={`https://medium.com/@${medium}`}
        title="Medium Profile"
        target="_blank"
        className="hover:text-blue-300"
      >
        <FaMedium />
      </a>
    </div>
  )
}
