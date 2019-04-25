---
author: browniebroke
title:  "How I made 1000's of websites more secure with one line of code"
excerpt: "This is the story of learning about a new security header, added it to Gatsby, and made tons of sites more secure"
tags:
  - gatsby
  - security
  - headers
  - referrer-policy
---

Or at least [a lot of them](https://github.com/search?l=JavaScript&o=desc&q=gatsby-plugin-netlify&s=indexed&type=Code)...

## Learning about a new security header

Last week, I attended the [London Django meetup](https://www.meetup.com/djangolondon/). Among a very interesting lineup of talks, there was a [lighning presentation](https://skillsmatter.com/skillscasts/13859-london-django-lightening-talk) from [Adam Johnson](https://adamj.eu/) about security headers and how Django helps with them. If you don't know what security headers are, I urge you to watch the talk, it's a bit about Django but it applies about the web in general. 

While I knew the ones that comes with Django and the very important `Content-Security-Policy`, I discovered the `Referrer-Policy` header, including the [story of the `Referer` header mispelling](https://books.google.co.uk/books?id=3EybAgAAQBAJ&pg=PT541&lpg=PT541&redir_esc=y#v=onepage&q&f=false) from the early days of the web.

In the presentation, Adam mentioned a tool to check your site and educate about all the possible security headers: [Scott Helme](https://twitter.com/Scott_Helme)'s [securityheaders.com](https://securityheaders.com/). I was already following Scott on Twitter -I learned a great deal about CSP thnaks to him- but although he probably mentioned this tool, I forgot about it.

## Fixing my sites

After the presentation, I decided to check for a couple of my recent sites I built with [Gatsby](https://www.gatsbyjs.org/) which I expected to be pretty well covered. After checking, they were pretty well covered, but to my surprise, the `Referrer-Polocy` wasn't set.

I quickly found that this could be easily set via an option from [`gatsby-plugin-netlify`](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/). I started adding it and set it to the suggested value of `'same-origin'`, which seems pretty sensible:

```js{9}
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': ['Referrer-Policy: same-origin'],
        },
      },
    },
  ],
}
```

It all worked fine so I was going to add it to my other website, but then it strucked me that maybe I can push this to all websites built with Gatsby by contributing upstream, & multiply my impact! A quick check for [gatsbyjs.org](https://gatsbyjs.org) showed similar results as my own sites:

![Gatsbyjs.org security headers report before](/assets/images/gatbsyjs-security-headers-before.png)

## Fixing 1000's of website at once

So I went ahead and forked the repository on Github and quickly located [where the netlify plug-in](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify) is located in their monorepo architecture. Once in there, the plug-in codebase is actually pretty small so it was not hard to find the entry point and where to make the change, [in their SECURITY_HEADERS constants](https://github.com/gatsbyjs/gatsby/blob/5ef65a4a8783a9a81c3680d532432a26d2f4a27d/packages/gatsby-plugin-netlify/src/constants.js#L19-L26):

```diff
export const SECURITY_HEADERS = {
     `X-Frame-Options: DENY`,
     `X-XSS-Protection: 1; mode=block`,
     `X-Content-Type-Options: nosniff`,
+    `Referrer-Policy: same-origin`,
   ],
 }
```

Ideally I wanted to write tests but couldn't find any for the existing headers. Since the change was small, I decided to open a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/), with the plan to fix potential test failures later, but there was none. I marked it as ready for review and at this point I was expecting to wait for a while.

## The Gatsby community

Only a few hours later, a maintainer jumped in, approved my pull request with a extremely welcoming message and then merged it:

![Pull request approved](/assets/images/gatsby-pr-approved.png)

After that, a bot invited me into their organisation on Github with a welcome message, and pointed at their store where I could order a free swag!

![Gatsbot message](/assets/images/gatbsot-invite.png)

This an amazing contributor experience, I found this super welcoming and positive. Not every open source project can afford to give away some free swag, but a bit of automation around welcoming new contributors can go a long way in building a thriving community. I'll surely consider contributing again.

An easy win to achieve that is via [Probots](https://probot.github.io/) (and maybe also Action soon). There is a [welcome app](https://probot.github.io/apps/welcome/) that does something similar as the Gatbsy bot and which can be added to your project in a few minutes.

## Results

After this got merged, I wanted to see my change propagated to the [gatsbyjs.org](https://gatsbyjs.org) site. I checked again and here it was: 

![Gatsbyjs.org security headers report after](/assets/images/gatbsyjs-security-headers-after.png)

## Next steps

It would be nice to set the CSP, but as Adam pointed in his talk, this is a big one to implement -especially on existing sites- and there is no simple default. Gatsby has [an open issue](https://github.com/gatsbyjs/gatsby/issues/10890) to track some of the challenges around CSP.

I'm planning to add it to my websites and see how this goes, I'll probably use [`gatsby-plugin-csp`](https://github.com/bejamas/gatsby-plugin-csp) as it looks promising.
