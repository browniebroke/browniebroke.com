---
date: 2024-11-29
title: "Add button to share on Mastodon to my posts"
---

Similar to my earlier TIL about [adding "share on Bluesky" to my blog](/tils/2024-11-18-bluesky-action-intent-links), I just added support for sharing my posts on Mastodon from the bottom of my posts and TILs.

As far as I know, there is no official way to it, because there is no central place to direct people to, unlike BlueSky or Twitter/X. However, today I stumbled upon a neat solution on the [DjangoTV website](https://djangotv.com) and I liked it as a user so decided to implement it here.

It works using a tool by [@kytta](https://fosstodon.org/@kytta) deployed at [toot.kytta.dev](https://toot.kytta.dev). I initially tried to use my BlueSky snippet, but that prefilled the input with `+` instead of spaces, because I used `new URLSearchParams(...).toString()`, which was unnecessary in this case. Then I passed the text with hashtags, and noticed that the hashtags were lost. It makes sense as the `#` has a special meaning in the URL. I replaced these with the URL encoded version manually and it worked.

Here is the final snippet:

```javascript
function getMastodonSharingUrl(title, tags, postUrl, handle) {
  const hashtagsStr = tags
    ? tags.map((ht) => `%23${ht.replace(" ", "")}`).join(" ")
    : "";
  const textParam = `${title} by ${handle} ${postUrl} ${hashtagsStr}`;
  return `https://toot.kytta.dev/?text=${textParam}`;
}
```

Again, [the whole implementation](https://github.com/browniebroke/browniebroke.com/pull/1758), if you're curious.
