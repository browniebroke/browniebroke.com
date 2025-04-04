import React from "react";
import {
  FaGithub,
  FaGitlab,
  FaMastodon,
  FaMedium,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";
import { FaBluesky, FaThreads } from "react-icons/fa6";

import { site } from "../data/siteMetadata";
import { Stack } from "./stack.tsx";

export const SocialLinks: React.FC = () => {
  const { bsky, github, gitlab, mastodon, medium, twitter, stackoverflow } =
    site.social;

  return (
    <Stack>
      <a
        href={`https://fosstodon.org/${mastodon}`}
        title="Mastondon profile"
        rel="me"
        target="_blank"
        className="inherit-color"
      >
        <FaMastodon />
      </a>
      <a
        href={`https://bsky.app/profile/${bsky}`}
        title="Bluesky profile"
        target="_blank"
        className="inherit-color"
      >
        <FaBluesky />
      </a>
      <a
        href={`https://www.threads.net/@browniebroke}`}
        title="Threads profile"
        target="_blank"
        className="inherit-color"
      >
        <FaThreads />
      </a>
      <a
        href={`https://www.twitter.com/${twitter}`}
        title="Twitter profile"
        target="_blank"
        className="inherit-color"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://stackoverflow.com/users/${stackoverflow}`}
        title="Stackoverflow profile"
        target="_blank"
        className="inherit-color"
      >
        <FaStackOverflow />
      </a>
      <a
        href={`https://github.com/${github}`}
        title="Github profile"
        target="_blank"
        className="inherit-color"
      >
        <FaGithub title="Github Profile" />
      </a>
      <a
        href={`https://gitlab.com/${gitlab}`}
        title="Gitlab Profile"
        target="_blank"
        className="inherit-color"
      >
        <FaGitlab />
      </a>
      <a
        href={`https://medium.com/@${medium}`}
        title="Medium Profile"
        target="_blank"
        className="inherit-color"
      >
        <FaMedium />
      </a>
    </Stack>
  );
};
