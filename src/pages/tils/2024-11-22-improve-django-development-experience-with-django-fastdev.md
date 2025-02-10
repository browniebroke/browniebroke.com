---
date: 2024-11-22
title: "Improve Django development experience with django-fastdev"
---

I came across a [post from Trey Hunner](https://bsky.app/profile/trey.io/post/3lbfs6tusdk2n) which resonated with me, about how Django sometimes swallows errors in its templates. It can be convenient on prod, when the code is proven to be correct, but when I develop I'd rather have louder errors to guard against typos. [adamghill replied](https://bsky.app/profile/adamghill.com/post/3lbfuylqdik2z) with the 3rd party package [django-fastdev](https://github.com/boxed/django-fastdev). I've never heard of before but it seems very useful.

I've inspected the code to understand a bit how it works, and it's pretty much all implemented in the [`apps.py`](https://github.com/boxed/django-fastdev/blob/master/django_fastdev/apps.py) file. It's working by monkey patching various parts of Django. One may find this approach questionable but as long as it works, makes me more productive and that I don't have to maintain it, I'd be more than happy to use it. It's also very [easy to remove](https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to) if it ends up not working any more.

This is a creative and pragmatic way to solve the problem, bypassing entirely the much more difficult way to get thing into core. Underlines [the points recently made by Carlton Gibson](https://buttondown.com/carlton/archive/thoughts-on-djangos-core/) about the power of the 3rd party Django apps.
