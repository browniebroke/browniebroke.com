---
date: 2022-05-07
title: "Using Codespell to check for typos"
---

Today, I stumbled upon [Codespell](https://github.com/codespell-project/codespell), a tool to check for spelling mistakes in your code. I found out about it by looking at the [PyScript repo](https://github.com/pyscript/pyscript), which they define in their pre-commit config. Since most of my repos are set up with pre-commit.ci already, I went ahead and added the config, which just a couple of lines:

```yaml{2-5}
repos:
  - repo: https://github.com/codespell-project/codespell
    rev: v2.1.0
    hooks:
      - id: codespell
```

It didn't raise a lot of issues, but it did catch a couple of typos here and there.
