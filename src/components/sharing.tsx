import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Heading, Stack, Link } from '@chakra-ui/react'
import { FaTwitter, FaRegEnvelope } from 'react-icons/fa'
import { FaBluesky, FaMastodon } from 'react-icons/fa6'

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
            bsky
            mastodon
            twitter
          }
        }
      }
    }
  `)

  // Blusky sharing
  const hashtagsStr = post.frontmatter.tags
    ? post.frontmatter.tags.map((ht) => `#${ht.replace(' ', '')}`).join(' ')
    : ''
  const bskyParams = new URLSearchParams({
    text: `${post.frontmatter.title} by @${social.bsky} ${siteUrl}${path} ${hashtagsStr}`,
  }).toString()
  const bskyUrl = `https://bsky.app/intent/compose?${bskyParams}`

  // Mastodon sharing
  const mastodonHashtagsStr = post.frontmatter.tags
    ? post.frontmatter.tags.map((ht) => `%23${ht.replace(' ', '')}`).join(' ')
    : ''
  const mastodonText = `${post.frontmatter.title} by ${social.mastodon} ${siteUrl}${path} ${mastodonHashtagsStr}`
  const mastodonUrl = `https://toot.kytta.dev/?text=${mastodonText}`

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
        <Link href={bskyUrl} title="Share on Bluesky" isExternal>
          <FaBluesky />
        </Link>
        <Link href={mastodonUrl} title="Share on Mastodon" isExternal>
          <FaMastodon />
        </Link>
        <Link href={twitterUrl} title="Share on Twitter" isExternal>
          <FaTwitter />
        </Link>
      </Stack>
    </Stack>
  )
}
