---
date: 2023-11-04
title: "Running Python from subprocess cross platforms"
---

In one of my Python package offering a CLI, I added the ability to run it as `python -m mypackage`. Natuarally, I wanted to write a small test to make sure it worked, which used the `subprocess` module to run python with the `-m` flag. Simple enough, right?

```python
result = subprocess.run(["python", "-m", ...], ...)
```

Well, when I pushed to CI, I realised that the `python` executable couldn't be found on Windows... It's probably called `python.exe` or somthing like that. Do I need to introduce a condition in my test depending on the platform? Surely, there must be a better way.

After a quick search, [I found about `sys.executable`](https://stackoverflow.com/a/912847/2261637), which does exactly that. Neat!

Here is how my test looks like now:

```python
import subprocess
import sys


def test_can_run_as_python_module():
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "mypackage",
            "--help"
        ],
        check=True,
        capture_output=True,
    )
    assert result.returncode == 0
    assert b"my-package [OPTIONS]" in result.stdout
```

Hope that helps!
