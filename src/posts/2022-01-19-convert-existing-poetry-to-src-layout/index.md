---
date: 2022-01-19
author: browniebroke
title: 'Convert a Poetry package to the src layout'
description: 'Quick run down on the steps required to convert a Python package using Poetry to the src layout.'
header_image: header.jpg
tags:
  - python
  - poetry
  - packaging
---

The `src` layout is commonly used in Python ecosystem nowadays (even [the pytest docs](https://docs.pytest.org/en/6.2.x/goodpractices.html#tests-outside-application-code) recommend it), but I'm not really using it on my projects. I think I've never hit the pain points it solves, and last time I tried, it made my development workflow more complicated.

I'm not going into the whys, they are detailed in [this excellent blog](https://blog.ionelmc.ro/2014/05/25/python-packaging/) explaining its rationale in detail, where I read about it the first time.

In the recent years, as it became more popular, the tooling has caught up, and I wanted to try it again to see if the situation improved.

## Starting a new project

If you start a new project, Poetry supports it out of the box in [their `poetry new` command](https://python-poetry.org/docs/cli/#new):

```sh
poetry new --src my-package
```

Although you might want to use a full blown template with other tools also configured (e.g. pytest).

## Converting a project

I found it a bit less well documented how to convert a project, so here you go. Assuming the project uses Poetry, pytest and a layout as follows:

```sh
my-package
├── poetry.lock
├── pyproject.toml
├── my_package
│   ├── __init__.py
│   └── main.py
└── tests
    ├── __init__.py
    └── test_main.py
```

Here are the steps I followed to convert to `src/` layout, without changing the imports in my tests:

1. Create a `src/` **folder**. And I really mean folder, not package: do not create a `__init__.py` in that folder.
2. Move `my_package` into `src/`.
3. Change you `packages` section in your `pyproject.toml`:

   ```diff
     packages = [
   -     { include = "my_package" },
   +     { include = "my_package", from = "src" },
     ]
   ```

4. Add `pythonpath` to your pytest option as follows:

   ```diff
     [tool.pytest.ini_options]
   + pythonpath = ["src"]
   ```

   If using pytest <7, you'll also need to install `pytest-srcpaths`:

   ```sh
   poetry add -D pytest-srcpaths
   ```

5. If your `pyproject.toml` references some paths, make sure to update them, e.g python-semantic-release:

   ```diff
     [tool.semantic_release]
     branch = "main"
   - version_variable = "my_package/__init__.py:__version__"
   + version_variable = "src/my_package/__init__.py:__version__"
   ```

If everything went well, you should have the following layount and running `pytest` should work:

```sh
my-package
├── poetry.lock
├── pyproject.toml
├── src
│   └── my_package
│       ├── __init__.py
│       └── main.py
└── tests
    ├── __init__.py
    └── test_main.py
```

## Conclusion

This was much easier than I remembered! I think I'll change all my projects to this layout, having this guide will help me reprodude it. Hopefulluy it'll help you as well!
