---
date: 2020-07-12
author: browniebroke
title: 'Auto-update pre-commit hooks with GitHub Actions'
description: 'A short post to explain how to get pre-hooks to automatically update their version in the config file.'
header_image: images/gh-action-pre-commit-hook/header.png
og_image: images/gh-action-pre-commit-hook/open-graph.png
tags:
  - python
  - pre-commit
  - github
  - actions
---

Pre-commit hooks are great to reduce the feedback loop for things like linting and auto-formatting. Git supports them out of the box, but they are not easy to share across all developers working on a project, they need to be installed by each developers.

Several tools exist to solve this problem, but my favorite is [pre-commit](https://pre-commit.com/). It's written in Python, but it aims at being [language agnostic](https://pre-commit.com/#supported-languages). It saves your setup in a config file and developers can install all of them with a single command.

Each tool is referenced by their github repo and tag to install, which is great because each tool is pinned to a specific version. However, I usually have their version already elsewhere in my repository, for example in `requirements.txt`, and this duplicates the version in 2 places. The main project dependencies are automatically updated with Dependabot, [PyUP](https://pyup.io/) or [Renovate](https://renovate.whitesourcesoftware.com/) but non of these tools supports the pre-commit config file, which means the versions start to drift eventually.

That is until this week-end, where I stumbled upon [the `autoupdate` command](https://pre-commit.com/#pre-commit-autoupdate) from pre-commit. I'm not sure how I missed this before, it looks like it's been part of pre-commit for a really long time. By combining this with the power of Github actions, I was able to get it to send me a pull request each time a new version is available:

```yaml
name: Pre-commit auto-update

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  auto-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.8

      - name: Install pre-commit
        run: pip install pre-commit

      - name: Run pre-commit autoupdate
        run: pre-commit autoupdate

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v2
        with:
          token: ${{ secrets.CPR_GITHUB_TOKEN }}
          branch: update/pre-commit-autoupdate
          title: Auto-update pre-commit hooks
          commit-message: Auto-update pre-commit hooks
          body: |
            Update versions of tools in pre-commit 
            configs to latest version
          labels: dependencies
```

This workflow runs every day at midnight, run `pre-commit autoupdate` and send a pull request if there are any changes.

The piece that required a bit of fiddling is the action creating the pull request, partly to get commit message, title, content and labels right, but mostly because I initially used `secrets.GITHUB_TOKEN` as token, but it wouldn't trigger the CI build for that pull request.

It's a limitation which is well documented on the action's README, and is intentional from Github. I chose the solution to create a PAT scoped to `repo` and added it to the secrets as `CPR_GITHUB_TOKEN`. It's deployed and running on [the repo of `django-codemod`](https://github.com/browniebroke/django-codemod/actions?query=workflow%3A%22Pre-commit+auto-update%22).

The pull request action has a lot of fixed inputs, I would get one pull request for all updates. If several tools get a new version, they would all be updated at once, and if a pull request already exists, it would receive more updates. This is not necessarily a bad thing, but if one tool break the build due to new linting rules, all are stuck.

Maybe I'll look into making the pull request content a bit more dynamic, but for now it does the job I need to. I'm also planning to add this to my [Cookiecutter template for Python package](https://github.com/browniebroke/cookiecutter-pypackage), so I can get it for all my new projects.

I hope this can help folks keep their pre-commit hook up to date, maybe this will become obsolete when [pre-commit CI](https://pre-commit.ci/) is ready, or maybe it will be a cheaper and simpler alternative
