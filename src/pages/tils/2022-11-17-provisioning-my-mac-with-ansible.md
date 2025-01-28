---
date: 2022-11-17
title: "Provisioning my MacBook with Ansible"
---

[I wrote before](https://browniebroke.com/blog/new-year-new-laptop/) how I scripted the setup of my Apple MacBook pro. At the time, I used a combination of bash scripts, `Brewfile` and [Mackup](https://github.com/lra/mackup). This was better than nothing, but it was not really runnable over and over.

In the meantime, [Adam Johnson blogged](https://adamj.eu/tech/2019/03/20/how-i-provision-my-macbook-with-ansible/) about his setup, using Ansible, and I was curious about it. I never used Ansible by was interested to play with it, and it seemed like a good use case. I tried to adapt it for my need, but I quickly realised that I wasn't ready to actually run it on my machine (and therefore test it): I didn't want to mess anything.

Recently, my Mac had a hardware issue, and it came back from repairs wiped, so I decided to give it another go. I forked [Adam's repo](https://github.com/adamchainz/mac-ansible) and started by removing everything I didn't understand/needed. I ended up keeping mostly the brew packages, casks and the pyenv versions. And with a fresh machine, I was able to test it out.

Once my machine was setup, I was able to add more tasks to install some packages with pipx, and by running the playbook again, Ansible added what was missing. I'm still using Mackup to back up & restore my preferences, but I'm considering moving that to Ansible as well.
