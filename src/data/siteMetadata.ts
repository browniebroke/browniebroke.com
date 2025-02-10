const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4321"
    : process.env.REVIEW_ID
      ? `https://deploy-preview-${process.env.REVIEW_ID}--browniebroke.netlify.app`
      : `https://browniebroke.com`;

export const site = {
  siteUrl: baseUrl,
  title: "browniebroke.com",
  description: `Bruno Alla's personal site and blog - about programming, and other random things that interest me.`,
  author: `Bruno Alla`,
  bio: `Hi! I'm a web developer based in London, I work with Python & Django, I'm a DSF member and I help maintain a few Django projects, most notably Django REST Framework, Cookiecutter Django and DRF-excel.`,
  social: {
    bsky: `browniebroke.com`,
    github: `browniebroke`,
    gitlab: `browniebroke`,
    mastodon: `@browniebroke@fosstodon.org`,
    medium: `brunoalla`,
    stackoverflow: `2261637`,
    twitter: `_BrunoAlla`,
  },
};
