import React from 'react'
import { FaTwitter, FaRegEnvelope } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { ExternalLink } from '@browniebroke/react-ui-components'
import { Stack } from '@chakra-ui/react'

const SharingStyles = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Post {
  frontmatter: {
    title: string
    tags?: string[]
  }
}

interface SharingProps {
  post: Post
  path: string
}

export const Sharing: React.FC<SharingProps> = ({ post, path }) => {
  const {
    site: {
      siteMetadata: { siteUrl, social },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `)

  // Twitter sharing
  const hashtags = post.frontmatter.tags
    ? post.frontmatter.tags.filter((tag) => !tag.includes(' '))
    : []
  const twitterParams = new URLSearchParams({
    text: `${post.frontmatter.title} by Bruno Alla`,
    url: `${siteUrl}${path}`,
    via: social.twitter,
    hashtags: hashtags.join(','),
  }).toString()
  const twitterUrl = `https://twitter.com/intent/tweet/?${twitterParams}`

  // email sharing
  const mailtoParams = new URLSearchParams({
    subject: `${post.frontmatter.title} by Bruno Alla`,
    body: `${siteUrl}${path}`,
  }).toString()
  const emailUrl = `mailto:?${mailtoParams}`

  return (
    <SharingStyles>
      <h4>Liked it? Please share it!</h4>
      <Stack direction="row">
        <ExternalLink to={emailUrl} title="Share via email">
          <FaRegEnvelope />
        </ExternalLink>
        <ExternalLink to={twitterUrl} title="Share on Twitter">
          <FaTwitter />
        </ExternalLink>
      </Stack>
    </SharingStyles>
  )
}
