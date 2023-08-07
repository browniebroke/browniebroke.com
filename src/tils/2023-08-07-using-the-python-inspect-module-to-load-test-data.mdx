---
date: 2023-08-07
title: "Using Python's inspect module to load test data"
---

## The problem

In one of my Django project, a pattern started to emerge in my tests, where I needed mock data coming out a 3rd party API. The 3rd party API docs often shows an example, which is great to get a basic payload to use in tests. However, I couldn't paste it directly on my test code:

- It is in JSON format, which isn't necessarily valid Python. For example if the example contains some `null` or boolean values (`false` in JSON vs `False` in Python).
- It might be a few 100 lines long, distracting from the test code
- May contain a lot of data irrelevant to the test.

Still, I like to have a snapshot of the example, in my code: some fields might be useful in the future, and having the full payload in git enables me see if some fields are being added or removed by the 3rd party.

## Initial solution

My solution is to paste the example in a JSON file, and write a small utility function to load the json from the file. To separate it from my test, while leaving it close, I started to put it in a `data` directory directly adjacent to my test file:

```
tests/
├── data/
│   └── example.json
└── test_example.py
```

Then, I wrote a small utility function to load the data, in the test module:

```python
import json
from pathlib import Path


def load_data(filename):
    fixture_path = Path(__file__).parent / "data" / filename
    return json.loads(fixture_path.read_text())
```

I used it once, and moved on. Then I needed something similar, but also wanted the ability to override some fields, so I wrote another one, adding a `overrides` parameter:

```python
def load_data(filename, **overrides):
    fixture_path = Path(__file__).parent / "data" / filename
    base_data = json.loads(fixture_path.read_text())
    return {**base_data, **overrides}
```

After a while, as I added more integrations, a few versions popped up in my codebase. They were all similar, but because of the `__file__` magic, I couldn't easily reuse my function: the fixture would be loaded from directory adjacent to my utility function, not from the test module. However, I knew that Python introspection would probably let me do what I wanted.

## The reusable solution

A quick search brought up [a Stack Overflow answer](https://stackoverflow.com/a/60297932/2261637) describing exactly what I needed, using the [`inspect` module](https://docs.python.org/3/library/inspect.html#inspect.stack). Here is how my final solution looks like:

```python
import inspect
import json
from pathlib import Path
from typing import Any


def load_json(
    fixture_name: str,
    **overrides: Any,
) -> dict[str, Any]:
    """
    Load JSON from a fixture located a `data` directory.

    The directory is adjacent to the caller.
    """
    caller_file = inspect.stack()[1].filename
    data_path = Path(caller_file).parent / "data"
    fixture_path = data_path / fixture_name
    loaded_data = json.loads(fixture_path.read_text())
    return {
        **loaded_data,
        **overrides,
    }
```

This solution has some limitations (the caller must be the Python module adjacent to the test data, doesn't work with a top level array, ...), but it works fine for my use case. I can now reuse it across my codebase and improve it as my need evolve.
