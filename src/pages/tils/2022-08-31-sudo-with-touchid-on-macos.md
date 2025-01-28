---
date: 2022-08-31
title: "Sudo with TouchID on macOS"
---

A nifty trick learned from [this blog post](https://it.digitaino.com/use-touchid-to-authenticate-sudo-on-macos/). This is mostly writing here for my own future reference:

1. Edit `/etc/pam.d/sudo`
2. Add the line `auth sufficient pam_tid.so` below the `pam_smartcard.so` line

Done!
