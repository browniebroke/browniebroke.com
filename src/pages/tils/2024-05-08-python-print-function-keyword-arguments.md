---
date: 2024-05-08
title: "Python print function keyword arguments"
---

The [Python `print` function](https://docs.python.org/3/library/functions.html#print) is one of the first one folks learn about, since it's part of the "Hello World" program. It's often presented with its most basic usage, by passing a single argument to it:

```python
print("Hello World")
```

Simple, and readable.

However, I recently rediscovered its keyword arguments, especially the `end` one, that defaults to `\n` (newline character), which is added at the end of whatever you want to print. That's why when you call the above snippet multiple times, you'll see each string printed on a new line, as opposed to have them on the same.

## The problem

When running a long command, if you want to print the progress of the command, you might be tempted to do:

```python
def do_thing_over_many_entries(entries):
    total = len(entries)
    print(f"Starting processing {total} entries")
    for index, entry in enumerate(entries, 1):
        print(f"Processing entry {index}/{total}")
        # Do the thing
    print("All done")
```

This will print a wall of text, e.g.

```text
Starting processing 4000 entries
Processing entry 1/4000
Processing entry 2/4000
Processing entry 3/4000
...
Processing entry 4000/4000
All done
```

Which might be a bit disruptive as it'll fill up your terminal.

## Solution wih standard library

Using the `end` keyword argument is useful, you can pass carriage return `\r` to instead update the same line in place:

```python{5}
def do_thing_over_many_entries(entries):
    total = len(entries)
    print(f"Starting processing {total} entries")
    for index, entry in enumerate(entries, 1):
        print(f"Processing entry {index}/{total}", end="\r")
        # Do the thing
    print("All done")
```

Which will update the "Processing entry..." line as it goes:

```text
Starting processing 4000 entries
Processing entry 4000/4000
All done
```

## Solutions with 3rd party packages

This is a simple example with vanilla Python, but other libraries are providing higher abstractions for this kind of operation:

- [Rich](https://rich.readthedocs.io/en/stable/progress.html)
- [TQDM](https://github.com/tqdm/tqdm)

If you can afford to add a dependency to your project, check these out.
