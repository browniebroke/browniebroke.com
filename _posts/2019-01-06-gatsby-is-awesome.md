---
author: browniebroke
title:  "Gatsby is awesome"
excerpt: "How I evolved the stack of a website to Gatsby"
tags:
  - website
  - gatsby
  - netlify
---

![Gatsby Logo](/assets/images/gatsbyjs-logo.jpeg "Gatsby Logo")

Before I get down to the title of this post, I need to rewind to a few years ago to tell a story. 

## A bit of history

My mother is the owner of a small restaurant in my native village in the south of France. A few years ago, in 2013, she took the business over after 3 years of closure. As her son is a web developer, she asked me if that wouldn't be too much work to build a website for her, and of course, I accepted. Partly because that's the least I could do for her, and partly because I wanted to use this as a learning opportunity - design and tech wise.

First I had to decide on the stack. I initially decided to remain simple and coded this up with a plain PHP and good old includes and custom CSS. That worked for a bit, but as I had setup the continuous delivery at work, I couldn't be bothered to start a FTP client to update some content, and PHP wasn't interesting me to learn.

 As I was getting proficient at [Django](https://www.djangoproject.com/), I decided to rewrite it in Python and host it on [Heroku](https://www.heroku.com/). I didn't want to waste any time operating any production machines, or worse get some security setting wrong. I looked at using a Docker compose setup from a [cookie cutter template](https://github.com/pydanny/cookiecutter-django), but my dev machine wasn't supporting Docker well at the time. I also migrated the front-end to Bootstrap to make it responsive and give it a more decent look. I used [Wagtail CMS](https://wagtail.io/) to allow the content to be edited without my intervention. I had a CI/CD running and I was happy. Later, I added a "free" SSL, but unfortunately, it required switching to a Heroku paying tier. Also, Django moved forward, and I didn't keep up. 

Fast forward to 2018, and the site was running an outdated stack, potentially leaving it insecure, and the CMS feature has barely been leveraged. So I was paying each month for something clearly over-engineered.

## List of requirements

After all these mistakes, I decided to start by making a list of things I needed, and to pick the next stack based on this:

- Reduce complexity of operation as much as possible
- Reduce work to keep it up to date as much as possible 
- SSL certificate, [Let's Encrypt](https://letsencrypt.org/) FTW! 
- Ability to have a deploy preview for each pull requests
- Using a language I know about
- Using a new technology I'm exited about, if possible 
- With CMS capability, if possible

And the winner is... 

## Gatsby & JavaScript tooling 

![Gatsby + Netlify](/assets/images/gatsby-netlify.jpg "Gatsby Netlify")

Last year, I heard a lot about static site generators and one that caught my attention is [Gatsby](https://www.gatsbyjs.org/). I learned a bit of [React](https://reactjs.org/) at the end of 2017 (I recommend Wes Bos' [React for beginners](https://reactforbeginners.com/) course) and I liked its syntax. On the other hand, I've got a glimpse of the power of [Netlify](https://www.netlify.com/) and its great development experience at work. In combination with [Renovate](https://renovatebot.com/), it looked like I could achieve all my checklist. There was even a [CMS option](https://www.netlifycms.org/)! Only condition: make the Github repo public. Doesn't sound like a problem to me! 

After playing around with small throwaway projects, I figured I liked Gatsby, but Netlify CMS was a bit too much for now. I went on to start my site using the [Gatstrap template](https://github.com/jaxx2104/gatsby-starter-bootstrap), based on Bootstrap. This might make some people scream "why???", but I wanted to get a CSS baseline I could build upon, and I already knew Bootstrap quite well. Let's not try to learn too much at the same time!

After a bit of fiddling, the whole development experience is amazing. By open sourcing, I get all sort of services available to help me with [code quality](https://lgtm.com/) checks, Netlify deploy preview, and Renovate to keep dependencies up to date. I was so satisfied about this last one that I ended up activating auto merge. The site automatically keeps itself up to date! How amazing is that? Compared to Pyup (the Python equivalent I knew of) it behaves much better, especially when a rebase is needed. 

## Final words 

So a big thank you to the whole javascript community. I think all these tools & services are a massive productivity boost. Gatsby enables me to ship a very fast, optimised website following modern standards without me worrying about the details. On top of all this, my hosting costs are down to zero!
