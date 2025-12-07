---
date: 2025-12-05
title: "Using uv.lock file in tox"
---

I've migrated all my open source packages to uv a while back, and the ones which are Django packages are using tox to run the tests against all supported combination of Django + Python versions.

However, I didn't realise that the tox-uv plugin does not install dependencies from the uv lockfile by default.

The realisation came [in the `django-money` project](https://github.com/django-money/django-money/pull/809#issuecomment-3583474445): the test were running fine despite the lockfile being out of date.

This is [explicitly documented](https://github.com/tox-dev/tox-uv#uvlock-support) on the tox plugin project, but I completely missed that, and assumed it would just magically work.

The [fix](https://github.com/django-money/django-money/pull/811) I suggested is heavily inspired by Adam Johnson's setup ([example](https://github.com/adamchainz/django-cors-headers/blob/fe1065db7aad1051742695abe8ea4777be9fb7e9/pyproject.toml#L65-L80) from django-cors-headers). When I don't know how to do something in Django 3rd party packages, I often check one of his packages and always learn something from it.

Here are the key points:

1. Add `runner = uv-venv-lock-runner` to the tox test envs
2. Move the Django versions from `tox.ini` to `pyproject.toml` in `dependency-groups` and replace them by dependency groups
3. Add `tool.uv.conflicts` to mark the dependency groups as incompatible for uv ([documentation](https://docs.astral.sh/uv/reference/settings/#conflicts))

That's it! Once again, thanks Adam!
