---
date: 2024-11-18
title: 'Adding "share on Bluesky" to my blog'
---

I just added support for sharing my posts on Bluesky from the bottom of my posts and TIL.

The [way it works](https://docs.bsky.app/docs/advanced-guides/intent-links) is quite similar [to Tweeter/X](https://developer.x.com/en/docs/x-for-websites/tweet-button/overview) and since I already had this feature, it was pretty quick to adapt.

The main difference is that Tweeter has several parameters to provide your text, URL, hashtags and mentions separately, while the Bluesky method has a single field. Here is how it looks like:

```javascript
function getBskySharingUrl(title, tags, postUrl, bskyUsername) {
  const hashtagsStr = tags
    ? tags.map((ht) => `#${ht.replace(" ", "")}`).join(" ")
    : "";
  const bskyParams = new URLSearchParams({
    text: `${title} by @${bskyUsername} ${postUrl} ${hashtagsStr}`,
  }).toString();
  return `https://bsky.app/intent/compose?${bskyParams}`;
}
```

You can see the [whole implementation here](https://github.com/browniebroke/browniebroke.com/pull/1744).

I pass my own username as `bskyUsername` and that doesn't seem to pull through, it's showing as text instead of being recognised as my handle. Let me know if you know how to fix that.
