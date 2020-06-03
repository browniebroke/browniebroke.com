---
date: 2020-01-05
author: browniebroke
title: 'Self-host your Typography.js fonts with Gasby'
description: 'How to self-host the fonts used by your Typography.js theme with GatsbyJS.'
og_image: images/gatsby-awesome/gatsbyjs-logo.png
tags:
  - gatsby
  - gatsbyjs
  - fonts
  - google fonts
  - csp
  - content security policy
---

## Problem

I recently added a CSP to this blog, and one of the tricky parts when implementing this was that the fonts were coming from from Google fonts. Several extra directives were required, and depending on the browser I was using, it was not even working properly, I think Chrome wasn't properly loading them, while Firefox was.

## Investigation

To fix this, I decided that I should self-host the fonts I need instead of linking to several Google domains. I was ready to download the file and copy them in my codebase, but then I realised there is no CSS/SASS, so nothing linking to them...

I'm using the [Funston theme](https://www.npmjs.com/package/typography-theme-funston) for [Typography.js](http://kyleamathews.github.io/typography.js/) with [the appropriate Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-typography/). The fonts are [specified by the theme](https://github.com/KyleAMathews/typography.js/blob/33d86df7e0d7f44cd1a71c8bd8791bdb71a7ecc5/packages/typography-theme-funston/src/index.js#L10-L19) and the appropriate link tag are injected in the HTML when needed.

The only mention of self-hosting is in [the Gatsby plugin options](https://www.gatsbyjs.org/packages/gatsby-plugin-typography/#options):

> `omitGoogleFont`: (boolean, default: `false`) Typography includes [a helper](https://github.com/KyleAMathews/typography.js/blob/e7e71c82f63c7a146eb1b5ac7017695359dd9cba/packages/react-typography/src/GoogleFont.js) that makes a request to Google's font CDN for the fonts you need. You might, however, want to inject the fonts into JS or use a CDN of your choosing. Setting this value to `true` will make `gatsby-plugin-typography` skip the inclusion of this helper. **You will have to include the appropriate fonts yourself.**

However, how to include them yourself is left unanswered, but luckily someone [answered this question on Stackoverflow](https://stackoverflow.com/a/52786121/2261637).

## Solution

Ok, looks like I got all the pieces of the puzzle, let's code!

First, let's disable Google font from the `gatsby-plugin-typography` config:

```javascript{9}
// gatsby-config.js
{
  ...
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
  ]
}
```

The 2 fonts I need are "Patua One" and "Cabin Condensed", and -following the previous Stackoverflow post- you can find on npm [here](https://www.npmjs.com/package/typeface-patua-one) and [here](https://www.npmjs.com/package/typeface-cabin-condensed):

```bash
yarn add typeface-patua-one typeface-cabin-condensed
```

Then add them to the [`onInitialClientRender` browser API](https://www.gatsbyjs.org/docs/browser-apis/#onInitialClientRender):

```javascript
// gatsby-browser.js
exports.onInitialClientRender = () => {
  require('typeface-patua-one')
  require('typeface-cabin-condensed')
}
```

And that's pretty much it, now the fonts are self-hosted.

## Cleaning up my CSP

As I said in the intro, the main driver for this change was my CSP, which was at best overly complicated, and at worst wrong. So now that it doesn't need to be so complicated, let's review it.

The usage of Google fonts require -at least- the following to work:

- `'style-src': fonts.googleapis.com fonts.gstatic.com`
- `'font-src': fonts.gstatic.com`
- `'connect-src': fonts.googleapis.com`
- `'prefetch-src': fonts.googleapis.com`

Some directives, like `font-src` and `prefetch-src` are only required for Google fonts, so I can remove them from the plugin config.

## Final words

If you want to look at the entire change, I made [a pull request](https://github.com/browniebroke/browniebroke.com/pull/234) for it, feel free to have a look to it.
