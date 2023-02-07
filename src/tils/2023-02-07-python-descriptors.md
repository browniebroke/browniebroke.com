---
date: 2023-02-07
title: 'Python descriptors'
---

I only learned today about a neat Python feature: descriptors. I came across that feature twice in the same day: once at work on a custom Django field for translations and a second time in [this great article](https://lukeplant.me.uk/blog/posts/pythons-disappointing-superpowers/).

From the article, I dived a bit deeper and landed on the amazing ["Descriptor How To Guide"](https://docs.python.org/3/howto/descriptor.html) from the Python documentation. The example of logging is a simple, yet practical one, that helped me "get" it:

```python
import logging

logging.basicConfig(level=logging.INFO)


class LoggedAgeAccess:
    def __get__(self, obj, objtype=None):
        value = obj._age
        logging.info('Accessing %r giving %r', 'age', value)
        return value

    def __set__(self, obj, value):
        logging.info('Updating %r to %r', 'age', value)
        obj._age = value


class Person:
    age = LoggedAgeAccess()             # Descriptor instance

    def __init__(self, name, age):
        self.name = name                # Regular instance attribute
        self.age = age                  # Calls __set__()

    def birthday(self):
        self.age += 1                   # Calls both __get__() and __set__()
```

The guide expands on more advanced usages. I love how it starts simple, gets more complicated as you go, before expanding on the more formal definitions. A great resource from Raymond Hettinger.
