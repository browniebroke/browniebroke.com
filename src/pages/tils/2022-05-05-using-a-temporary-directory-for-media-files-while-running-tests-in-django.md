---
date: 2022-05-05
title: "Using a temporary directory for media files while running tests in Django"
---

Our Django test suite uses [factory-boy](https://factoryboy.readthedocs.io/en/stable/index.html) to simplify generating mocked data for our tests. Some of our models are creating images, and by default they are all called 'example.jpg', and some suffix is added avoid collision. As a result the media folder was being filled with `example_<radom suffix>.jpg`.

Not only this filled the disk on our development machines, but it also may cause some flakiness in our tests if the filename is part of the assertion.

To avoid that, I configured our test settings to use a temporary directory as media root:

```python
MEDIA_ROOT = tempfile.TemporaryDirectory().name
```

Since we use pytest-xdist to run test in parallel on the same machine, I've also included [the worker name](https://pytest-xdist.readthedocs.io/en/latest/how-to.html#envvar-PYTEST_XDIST_WORKER) in the suffix:

```python
PYTEST_XDIST_WORKER = env(
    'PYTEST_XDIST_WORKER',
    default='gw0',
)
MEDIA_ROOT = tempfile.TemporaryDirectory(
    suffix=f'_{PYTEST_XDIST_WORKER}',
).name
```

Once the session is complete, the temporary file is deleted, along with its content.
