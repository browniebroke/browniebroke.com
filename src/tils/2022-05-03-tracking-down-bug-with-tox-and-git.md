---
date: 2022-05-03
title: 'Tracking down a bug with tox and git'
---

Today I wanted to track down what broke the CI of an open source library ([django-coverage-plugin](https://github.com/nedbat/django_coverage_plugin)) which is testing against Django main branch.

The build was passing recently, but broke a few days ago. I needed to run something like [a git bisect](<(https://git-scm.com/docs/git-bisect)>), except it was not on the project itself (which hadn't changed much) but on Django, while running the project's test suite.

The project is tested with [tox](https://tox.wiki/en/latest/), which I used to run an isolated environment to install a version of Django from an archive based on a git commit, which GitHub exposes:

```ini
[testenv]
deps =
    ...
    djangorev: https://github.com/django/django/archive/dcebc5d.tar.gz
```

I looked at the recent commits from [the main branch](https://github.com/django/django/commits/main), picked one from a few days ago, made sure it worked, and saved it as `djangook` env. I then selected the most recent one, made sure that it failed, and saved it as `djangoko` env.

I chose the middle revision and replaced `djangook` or `djangoko`, depending on the result, which led me to find the commit which broke the test for the coverage plugin.

This is more or less the steps that happens when doing a git bisect -or a dichotomy in mathematics- except here I couldn't use this tool, so I had to do it manually. Tox saved me ton of time as I was able to create several isolated environments quickly.
