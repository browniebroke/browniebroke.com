---
date: 2025-02-21
author: browniebroke
title: "Project-level shareable live templates in PyCharm (or other IntelliJ IDEs)"
description: "Easily share small snippets of boilerplate code with your team when working on a large project."
header_image: _header.png
tags:
  - pycharm
  - templates
  - snippets
---

Most code editors have the ability to scaffold boilerplate with small pieces of templates: type a keyword and get some code generated for you, with the cursor moved to where you need to fill in the blank. While LLMs are getting better at suggesting code for us, these snippets are usually more precise, faster and easier to direct/nudge than an LLM, and serve a different purpose than what an LLM does.

IntelliJ calls them [live templates](https://www.jetbrains.com/help/pycharm/using-live-templates.html), VS Code calls them [snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets). [Emmet](https://emmet.io) works as a plugin for all editors in this category too.

## The missing feature

One feature that VS Code has is the ability to define [project level snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_project-snippet-scope). While working on a big codebase with a team, common patterns tend to emerge and having them encoded in custom snippets help to nudge everyone in following them.

However, not everyone uses VS Code. I use PyCharm and I figured I was missing out on these project level snippets. I had some custom live templates but sharing them with my fellow PyCharm users wasn't as straightforward.

## Finding a solution

After a bit of research, I discovered where my custom live templates are stored by my editor. Turns out that, on macOS, they are stored as xml in `~/Library/Application Support/JetBrains/PyCharm2024.3/templates/` (with PyCharm2024.3 whatever edit and version you're on). I wondered if I could make one a symbolic link to a folder in my repo and sure enough it worked.

1. From the editor UI, under Settings > Editor > Live templates
2. Add a new Template Group, e.g. "MyGroup"
3. Add a live template in it
4. Go to the templates directory from earlier, a new XML file with the same name should appear
5. Copy that file into your repo, in a memorable location. I went with `.pycharm/` folder at the root of my repo.
6. Create a symlink from where PyCharm looks pointing at your repo (assuming it's at `/path/to/repo/`):
   ```shell
   ln -s \
    /path/to/repo/.pycharm/MyGroup.xml \
    ~/Library/Application\ Support/JetBrains/PyCharm2024.3/templates/MyGroup.xml
   ```

After that, I had to restart my editor for the new file to be picked up. I did a few updates and the symlink was correctly followed on writes: the live templates updated in the UI appeared in the file stored in the repo.

## Install script

That worked well, but the instructions to install them were a bit fiddly, mainly because it requires to pass some absolute paths which are dynamic and prone to change in future versions. I figured I could write a simple bash script to do create the symlink in the right place and make a simple installation.

With a bit of help from the Codium plugin in my editor, I ended with a good enough script that looks like this:

```shell
#!/usr/bin/env bash

# Resolve path to the Legl.xml file in this directory
PARENT_DIR="$(dirname "$0")"
FULL_PATH="$(pwd)/$PARENT_DIR/MyGroup.xml"

# Get folder with highest number matching
# ~/Library/Application\ Support/JetBrains/PyCharm20*
LARGEST_VERSION_DIR=$(ls -d ~/Library/Application\ Support/JetBrains/PyCharm20* | sort -V | tail -1)

ln -s \
  "$FULL_PATH" \
  "$LARGEST_VERSION_DIR/templates/MyGroup.xml"
```

it's probably not catering for all use cases but as I said it's good enough. Now my teammates can run that install script with `.pycharm/install.sh` and the live templates are synced back and forth.
