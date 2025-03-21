---
date: 2024-11-24
title: "New  argument to Django redirects"
og_image: _2024-11-24-new-argument-to-django-redirects.png
---

A [pull request](https://github.com/django/django/pull/18616) has been merged into Django this week, to make it easier to do a redirect while preserving the HTTP method.

It took me an embarrassingly long time in my career to learn that the most common redirects (301 and 302) don't preserve the HTTP method. I also often confuse the known temporary permanent, and it's even harder to remember which one is which between 307 and 308.

With this new change, it will make these status code easier to learn, remember and use them. This higher level API is a much welcome addition in my opinion, replacing this:

```python
def my_old_vew(request):
    return HttpResponseRedirect(status_code=307)
```

By:

```python
def my_old_vew(request):
    return HttpResponseRedirect(preserve_method=True)
```
