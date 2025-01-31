---
date: 2024-12-02
title: 'Docker ADD vs COPY instructions'
---

While reviewing a change in Cookiecutter Django, a co-maintainer (Fábio C. Barrionuevo da Luz [@luzfcb](https://github.com/luzfcb)) [pointed at](https://github.com/cookiecutter/cookiecutter-django/pull/5434#discussion_r1865740149) a section of the Docker documentation outlining the subtle, but important, [differences between `ADD` and `COPY`](https://docs.docker.com/build/building/best-practices/#add-or-copy).

If you asked me yesterday, I wouldn't have been able to tell you the difference, and this was indeed enlightening. My takeaways:

1. Start with `COPY` to copy files into the container, being from the host filesystem or from another stage.
2. If the file is only needed temporarily, use a `RUN` instruction with bind mount instead.
3. Use `ADD` if you need to put files into your container **from a remote source**.

I don't expect to remember this in one month time, but hopefully this page will help me find the resource quickly next time I need it.
