import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Heading, Stack, Link } from '@chakra-ui/react'
import { FaTwitter, FaRegEnvelope } from 'react-icons/fa'

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

export const Sharing = ({ post, path }: SharingProps) => {
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
    <Stack direction="column" alignItems="center" marginY={12}>
      <Heading as="h4" size="md">
        Liked it? Please share it!
      </Heading>
      <Stack direction="row">
        <Link href={emailUrl} title="Share via email" isExternal>
          <FaRegEnvelope />
        </Link>
        <Link href={twitterUrl} title="Share on Twitter" isExternal>
          <FaTwitter />
        </Link>
      </Stack>
    </Stack>
  )
}
