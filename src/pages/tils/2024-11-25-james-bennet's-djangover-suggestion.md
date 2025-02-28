---
date: 2024-11-25
title: "James Bennet's DjangoVer suggestion"
---

I saw [this post](https://www.b-list.org/weblog/2024/nov/18/djangover/) from James Bennet shared around in a few places last week, and only came around to read it now. The TL;DR is that it's making the case for "DjangoVer", a versioning scheme to align 3rd party Django packages versions with the latest version of Django version they support.

I think it's a great idea, it would make it much easier to see at a glance in your requirements.txt/pyproject.toml if you're ready to upgrade, or at least give you an idea on likely you're ready to upgrade:

- If most packages are a couple of major versions behind, you can assume you're not ready.
- If most package are aligned except a couple with one minor behind, it's probably worth a try.
- If a single package is dragging behind, time to find an alternative.

I'll think about it for a while, but I'll probably move my projects to this scheme at some point.
