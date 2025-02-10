---
date: 2018-01-14
author: browniebroke
title: "New year, new laptop"
description: "The story of the clean install of my new laptop"
tags:
  - laptop
  - setup
  - apple
---

A couple of days ago, I accidentally dropped my old laptop on the floor. It was an old
Macbook Pro from mid 2010, which I've upgraded a couple of times by swapping a HDD to a SDD
and then by doubling the RAM twice. I had 1TB storage and 16GB of memory, but the old
processor was starting to age. After almost 8 years of service, its life came to an end.

After weighting the options, I decided to go for a Macbook Pro 15 inches, and while it was being delivered,
I spent some time updating [my setup scripts](https://github.com/browniebroke/macbook-scripts). It used to
be a shell script calling [Homebrew](https://brew.sh/) directly, but I recently stumble upon
[Homebrew bundle](https://github.com/Homebrew/homebrew-bundle) and decided to use that instead. It was a
good opportunity to review what I no longer needed and what was missing from it.

When I received the new machine, I downloaded the files from there and ran the entry point
bash script, and it worked great. The settings were restored using
[mackup](https://github.com/lra/mackup), which I'm glad I've set it up recently.

However, I had a lot of environments setup in [Insomnia](https://insomnia.rest/)
(an alternative to Postman which I prefer), and sadly mackup didn't carry them over.
It's probably not supporting that (yet?), so it might be an opportunity to improve this
great project. My preferences from PyCharm were not fully backed up either, it looks like
something changed recently as other people have reported a similar problem in Jetbrains
products.

I also use [Cerebro](https://github.com/KELiON/cerebro/) which is bit like Spotlight
on steroids. The current Homebrew version (0.3.2) is crashing, so I had to grab the previous
version and install it manually. I couldn't find how to install a specific cask version.
Hopefully [this issue](https://github.com/KELiON/cerebro/issues/434) will be resolved
soon. Also, it looks like Docker for Mac is not installable via Homebrew, I had to go and get
it from their website.

Lastly, there is still a chicken and egg situation where I need to login to Dropbox first,
which requires the password from 1password, which settings are backed up in mackup.

I'm very satisfied overall, the setup has been almost entirely automated.

_UPDATE: I've submitted [a pull request](https://github.com/lra/mackup/pull/1116)
to Mackup to add support for Insomnia, as it was very simple to do, and it just got
merged!_

_UPDATE II: Since the Cerebro issue seems to be stuck, I've
[sent a PR](https://github.com/caskroom/homebrew-cask/pull/43305) to homebrew-cask
to revert the 0.3.2 upgrade and install 0.3.1 instead._
