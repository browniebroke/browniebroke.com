import React from "react";
import { FaTwitter, FaRegEnvelope } from "react-icons/fa";
import { FaBluesky, FaMastodon } from "react-icons/fa6";

import { site } from "../data/siteMetadata";
import { Stack } from "./stack.tsx";

interface SharingProps {
  frontmatter: {
    title: string;
    tags?: string[];
  };
  path: string;
}

export const Sharing = ({ frontmatter, path }: SharingProps) => {
  const { social, siteUrl } = site;
  // Blusky sharing
  const hashtagsStr = frontmatter.tags
    ? frontmatter.tags.map((ht) => `#${ht.replace(" ", "")}`).join(" ")
    : "";
  const bskyParams = new URLSearchParams({
    text: `${frontmatter.title} by @${social.bsky} ${siteUrl}${path} ${hashtagsStr}`,
  }).toString();
  const bskyUrl = `https://bsky.app/intent/compose?${bskyParams}`;

  // Mastodon sharing
  const mastodonHashtagsStr = frontmatter.tags
    ? frontmatter.tags.map((ht) => `%23${ht.replace(" ", "")}`).join(" ")
    : "";
  const mastodonText = `${frontmatter.title} by ${social.mastodon} ${siteUrl}${path} ${mastodonHashtagsStr}`;
  const mastodonUrl = `https://toot.kytta.dev/?text=${mastodonText}`;

  // Twitter sharing
  const hashtags = frontmatter.tags
    ? frontmatter.tags.filter((tag) => !tag.includes(" "))
    : [];
  const twitterParams = new URLSearchParams({
    text: `${frontmatter.title} by Bruno Alla`,
    url: `${siteUrl}${path}`,
    via: social.twitter,
    hashtags: hashtags.join(","),
  }).toString();
  const twitterUrl = `https://twitter.com/intent/tweet/?${twitterParams}`;

  // email sharing
  const mailtoParams = new URLSearchParams({
    subject: `${frontmatter.title} by Bruno Alla`,
    body: `${siteUrl}${path}`,
  }).toString();
  const emailUrl = `mailto:?${mailtoParams}`;

  return (
    <div className="flex flex-col items-center my-12">
      <h4 className="text-xl font-bold mb-4">Liked it? Please share it!</h4>
      <Stack>
        <a
          href={emailUrl}
          title="Share via email"
          target="_blank"
          rel="noopener noreferrer"
          className="inherit-color"
        >
          <FaRegEnvelope />
        </a>
        <a
          href={bskyUrl}
          title="Share on Bluesky"
          target="_blank"
          rel="noopener noreferrer"
          className="inherit-color"
        >
          <FaBluesky />
        </a>
        <a
          href={mastodonUrl}
          title="Share on Mastodon"
          target="_blank"
          rel="noopener noreferrer"
          className="inherit-color"
        >
          <FaMastodon />
        </a>
        <a
          href={twitterUrl}
          title="Share on Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="inherit-color"
        >
          <FaTwitter />
        </a>
      </Stack>
    </div>
  );
};
