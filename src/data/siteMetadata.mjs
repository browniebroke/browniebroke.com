const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.REVIEW_ID
      ? `https://deploy-preview-${process.env.REVIEW_ID}--browniebroke.netlify.app`
      : `https://browniebroke.com`;

export const site = {
  title: "browniebroke.com",
  description: `Bruno Alla's blog - about programming, and other random things that interest me.`,
  author: `Bruno Alla`,
  siteUrl: baseUrl,
  social: {
    bsky: `browniebroke.com`,
    github: `browniebroke`,
    gitlab: `browniebroke`,
    mastodon: `@browniebroke@fosstodon.org`,
    medium: `brunoalla`,
    stackoverflow: `2261637`,
    twitter: `_BrunoAlla`,
  },
}