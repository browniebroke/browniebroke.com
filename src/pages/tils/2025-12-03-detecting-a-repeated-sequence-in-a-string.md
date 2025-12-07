---
date: 2025-12-03
title: "Detecting a repeated sequence in a string"
---

A challenge that came up during [Advent of Code 2025](https://adventofcode.com/2025) day 2, where one had to detect whether a string was made up of a repeated sequence: `ABCABCABC`.

I initially wrote the algorithm by hand, but wasn't pleased with the performance nor by how elegant the solution was. After having solved it, I wanted to learn more and [found this page](https://www.geeksforgeeks.org/python/python-check-if-string-repeats-itself/) listing a few option. This solution caught my attention:

```python
bool(re.fullmatch(r"(.+)\1+", value))
```

I'm more used to using the `re.match` function, but in this case we need the `re.fullmatch`:

> If the _whole_ string matches the regular expression _pattern_, return a corresponding Match. Return None if the string does not match the pattern; note that this is different from a zero-length match.

I never really needed that, but it's good to have found a use case for it. Hopefully, I will remember this trick next time I need it!
