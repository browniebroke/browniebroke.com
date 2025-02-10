---
date: 2022-11-21
author: browniebroke
title: "Specify docs dependency groups with Poetry and Read the Docs"
description: "Guide on how to setup your package on Read the Docs with Poetry's dependency groups."
header_image: poetry_rtd_header.png
tags:
  - poetry
  - readthedocs
  - packaging
  - documentation
---

I wrote a while back on how to [migrate a project to Poetry](/blog/migrating-project-to-poetry/). One of the gotcha was how to specify the dependencies to build the project documentation, especially on Read the Docs. The solution, at the time, was to specify these dependencies as "extras", which had the unintended side effects of being visible to your users, while only needed for internal purposes. By that, I mean that the package could be installed with `pip install package-name[docs]`.

## Dependency groups

Poetry 1.2 introduced a new feature which I have been waiting for a while: [dependency groups](https://python-poetry.org/docs/managing-dependencies/#dependency-groups). Until recently, the only groups were the main dependencies (the one that your package needs to run) and the development dependencies (the ones that are only needed for development, like testing or linting).

With dependency groups, you can now specify any arbitrary group of dependencies, and use them in any way you want. they can be optional or not.

This help us solve my previous problem, now I can add an optional `docs` dependency group and use it to build the documentation. I use [MyST parser](https://myst-parser.readthedocs.io) with [Sphinx](https://www.sphinx-doc.org), so here is how it might look like:

```toml
[tool.poetry.group.docs]
optional = true

[tool.poetry.group.docs.dependencies]
myst-parser = ">=0.16"
sphinx = ">=4.0"
sphinx-autobuild = ">=2021.0"
sphinx-rtd-theme = ">=1.0"
```

Now I can install my docs dependencies with:

```shell
poetry install --with docs
```

And no extras are added to my package. Nice.

## Read the Docs

The other piece of the puzzle is to get my documentation online. I usually do this using Read the Docs. They have good support for installing the package being documented with extras, but they don't have Poetry installed, so it needs a bit of customisation. The good news is that their config file is flexible enough to allow it. The example for Poetry was just a bit out-of-date with the recent Poetry 1.2 release. I sent [a pull request](https://github.com/readthedocs/readthedocs.org/pull/9743) to fix it, but came up with a suboptimal solution, which one of the maintainer helped me improve. The updated version will be published soon, but here is what I ended up with:

```yaml {8-15}
version: 2

build:
  os: ubuntu-20.04
  tools:
    python: "3.9"
  jobs:
    post_create_environment:
      # Install poetry
      - pip install poetry
      # Tell poetry to not use a virtual environment
      - poetry config virtualenvs.create false
    post_install:
      # Install dependencies
      - poetry install --with docs

sphinx:
  configuration: docs/source/conf.py
```

The main trick is to configure Poetry to not create virtual environment, and then pass the `poetry install` command form the previous section with docs group as `post_install`. RTD doesn't let you customise the installation step, and it may install some older version of Sphinx, so by setting as `post_install`, you're sure to get what you ask for. This last bit shouldn't be a problem unless your RTD project was created a long time ago.

## Closing words

I hope this helps you if you're using Poetry and Read the Docs. If you have any questions, feel free to reach out to me on [Mastodon](https://fosstodon.org/@browniebroke) or [Twitter](https://twitter.com/browniebroke).
