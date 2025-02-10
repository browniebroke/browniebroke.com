---
date: 2024-07-17
title: "Opening the PyCharm registry"
---

Today, I encountered an issue with my IDE (PyCharm) and its integration with Docker. It wouldn't refresh my remote interpreter, which broke most of the intellisense and go to definition. I found [this Youtrack issue](https://youtrack.jetbrains.com/issue/PY-73909) which described my problem close enough.

Someone replied and suggested to change a `python.use.targets.api` setting, which is a bit hidden, as it's a registry entry. I searched how to open the registry, but couldn't find much resources.

The answer is:

1. <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>⇧</kbd> + <kbd>/</kbd> to open the
   maintenance context menu
2. Choose the first option, "Registry..." from it

Done! Hopefully that'll help me and others in the future.
