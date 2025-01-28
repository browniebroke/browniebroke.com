---
date: 2021-01-07
author: browniebroke
title: 'Convert Python requirements to Poetry format'
description: 'Automate your migration to Poetry with dephell.'
header_image: header.png
tags:
  - python
  - dephell
  - requirements
  - poetry
  - packaging
---

I [recently wrote](../migrating-project-to-poetry/) about migrating a Python project to [Poetry], however, this guide is quite manual process. I recently came across [dephell], which seems to be able to automate some part of it. I wanted to check out how it might help for this follow-up post.

## Migrate setup.py stuff

First step is to migrate meta-data and direct dependencies specified in `setup.py` file:

```sh
dephell deps convert \
  --from=setup.py \
  --to-format=poetry \
  --to-path=pyproject.toml
```

This converts some package metadata and add the dependencies which are listed in your `setup.py`.

## Convert development dependencies

The development dependencies are located in `requirements.in` (as I used [pip-tools]), and to not overwrite the dependencies from the previous step, let's write them to a temporary file:

```sh
dephell deps convert \
  --from=requirements.in \
  --to-format=poetry \
  --to-path=pyproject-dev.toml
```

Create a new section for development dependencies in `pyproject.toml` and move over dependencies from `pyproject-dev.toml`:

```toml
[tool.poetry.dev-dependencies]
# copy deps from pyproject-dev.toml here
```

Now you can get rid of the temporary `pyproject-dev.toml` file.

## Finish

As far as I'm aware, that is as far as this tool will get you. The `pyproject.toml` file should almost be ready for Poetry, you can try running `poetry install` and fix the remaining issues.

In my case, here are the things I needed to adjust:

- the minimum Python version wasn't properly detected, it was just `'*'` despite my `setup.cfg` having `python_requires >= 3.6`.
- Not all metadata were converted, I had to finish them manually.
- Some extra classifiers were included although Poetry can generate some of them automatically.
- Other tools configured via `setup.cfg` which I wanted to migrate to `pyproject.toml` are not migrated by this tool, it's -understandably- out of its scope.

Nevertheless, this tool could speed up migration for projects with lots of dependencies.

[poetry]: https://python-poetry.org/
[dephell]: https://dephell.readthedocs.io/cmd-deps-convert.html
[pip-tools]: https://github.com/jazzband/pip-tools
