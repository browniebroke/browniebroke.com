---
date: 2019-11-14
author: browniebroke
title: 'Setting up a Content Security Policy with Gatsby'
description: 'My quick story on how I added a content security policy (CSP) on my blog, powered by GatsbyJS.'
og_image: 05-a-grade-security-headers.png
tags:
  - gatsby
  - gatsbyjs
  - security
  - headers
  - csp
  - content security policy
---

This is a quick story telling how I set up a content security policy on my personal blog which is powered by [Gatsby](https://www.gatsbyjs.org/). I've been keen to try adding CSP for a while but I know it can be tricky to get right and cover everything. However, this blog is a very simple use case as I embed very little third party scripts but it took me some time to get it right nevertheless.

## First attempt

Gatsby is relatively young but has already a rich plugin ecosystem. So the first thing I did was to research any plugin that would help with this. I quickly found [`gatsby-plugin-csp`](https://www.gatsbyjs.org/packages/gatsby-plugin-csp/) doing exactly what I wanted. I went ahead and installed it without any options to give it a try:

```javascript
// gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-csp`],
}
```

I opened a pull request to check a production-like [deploy preview on Netlify](https://5dc89dea31c71e000832cd5a--browniebroke.netlify.com/), but it looked pretty broken:

![First try](01-first-try.png 'First Try')

Looks like a few things were missing... Let's customise this plugin!

## Starting to customise

The plugin has a few options, I quickly glanced the documentation and immediately started adding directives for the errors that were reported. I'm using Google analytics and Google fonts, I need to whitelist them:

```javascript{6-12}
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        directives: {
          'script-src': `'self' www.google-analytics.com`,
          'style-src': `'self' 'unsafe-inline' fonts.googleapis.com`,
          'img-src': `'self' data: www.google-analytics.com`,
        },
      },
    },
  ],
}
```

Pushed to my branch again, waited for the deployment to be updated, but [it was still not looking great](https://5dc8a896ace0c4000847a904--browniebroke.netlify.com/):

![With Options](02-second-with-options.png 'With Options')

Hum, weird it looks even worse! Ok the errors are different, let's keep customising. Looking at the errors, I can see another Google font domain and inlines are missing, let's add them:

```javascript{8-10}
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        directives: {
          'script-src': `'self' 'unsafe-inline' data: www.google-analytics.com`,
          'style-src': `'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com`,
          'img-src': `'self' data: www.google-analytics.com`,
        },
      },
    },
  ],
}
```

Let's [deploy again](https://5dc8acc45da30f0008c79aa6--browniebroke.netlify.com/)... But now I'm confused:

![Inline disallowed](03-inline-disallowed.png 'Inline disallowed')

It says some inlines are disallowed, but they are in my directive!

## Time to read the documentation

After going back to the plugin documentation, I can see they have 2 options `mergeScriptHashes` and `mergeStyleHashes`, but I didn't really understand what they are for. At the bottom of the plugin's readme, there is a link to [a blog post](https://bejamas.io/blog/content-security-policy-gatsby-websites/) that I should have read first.

What happens? The plugin tries its best to generate a list of the hashes for the allowed inlines script and styles that Gatsby adds. It turns out that the CSP specification states that a policy cannot use both hashes and `'unsafe-inline'`, and to be fair, that's what my browser is telling me in the first warning at the top of my console:

```log
Content Security Policy: Ignoring "'unsafe-inline'" within script-src or style-src: nonce-source or hash-source specified
```

Lesson learned: read the warning/errors from top to bottom, not the other way around.

## Solution

These 2 options were exactly what I needed, we can't use `unsafe-inline` with hashes which are included by the plugin, we need [to disable them](https://github.com/bejamas/gatsby-plugin-csp/issues/3#issuecomment-521032340).

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          'script-src': `'self' 'unsafe-inline' data: www.google-analytics.com`,
          'style-src': `'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com`,
          'img-src': `'self' data: www.google-analytics.com`,
          'font-src': `'self' data: fonts.gstatic.com`,
        },
      },
    },
  ],
}
```

At this point, it all [look good visually](https://5dc9d3e45c60a70008e187a5--browniebroke.netlify.com/), but when checking [security headers](secutiryheaders.com), I still had a B grade:

![B Grade](04-b-grade-security-headers.png 'B Grade')

## Moving policy to the HTTP header

The plugin implements CSP by using a `<meta>` tag, not a HTTP header. They have [an issue open](https://github.com/bejamas/gatsby-plugin-csp/issues/4) to support HTTP headers, but it looks like it won't be supported soon as it depends on the deployment platform used. The issue links to [a comment](https://github.com/gatsbyjs/gatsby/issues/10890#issuecomment-468982396) with a solution to inject the CSP to the headers with the `gatsby-plugin-netlify` package. [The patch](https://github.com/DeveloPassion/website/commit/c31120ccccefed43c266c8ef862ec696bd36c7a8) is pretty self-contained so I decided to [replicate it on this blog](https://github.com/browniebroke/browniebroke.com/pull/210/commits/f27c05c84b0f4f2785aca0f2b8ef73efddb39a14). Seem to work fine and after deploying, I finally got this A grade I was after:

![A Grade](05-a-grade-security-headers.png 'A Grade')

Success! Press merge and got it deployed.

## Final words

Thanks for the very helpful resources out there, [Thom Krupa](https://github.com/thomkrupa) & the [Bejamas organisation](https://github.com/bejamas) as well as [Sebastien Dubois](https://github.com/dsebastien) for the script to make the header work.

The A grade is nice, however the policy I'm ending up with is not very secure and allows a lot of thing to be executed. Each time we need to resort to unsafe-inline, we're opening up a breach for attackers. I don't have much sensitive things on this site though, so it's probably good enough for this case and this seems to be the best we can do for now. I'll keep a close eye to the improvements in Gatsby and the CSP to see things evolve.
