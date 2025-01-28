---
date: 2022-11-25
author: browniebroke
title: 'Enabling sudo via TouchID using Ansible'
description: 'A small post explaining how to integrate sudo with Touch ID on Mac.'
header_image: ansible-header.png
tags:
  - ansible
  - sudo
  - touchid
  - macos
---

[I discovered](/tils/sudo-with-touchid-on-macos/) fairly recently in [a blog post](https://it.digitaino.com/use-touchid-to-authenticate-sudo-on-macos/) that it was possible to enable sudo mode in the terminal via Touch ID instead of having to type my password. I'm glad I wrote a TIL about it because I was able to find it again very easily and do it again on a new machine.

Today, I went a step further and integrated this into [my Ansible playbook](/tils/provisioning-my-mac-with-ansible/) that I use to provision my machine. This was a pretty simple action which made me learn a bit more about Ansible. If you're in a rush, [here is the commit](https://github.com/browniebroke/mac-ansible/commit/0235430ab45f5519aa97d3df317d3a61a405c546) with the solution I ended up with:

```yaml
# Do sudo using Touch ID
- name: Set content of sudo file as fact
  set_fact:
    sudo_conf: "{{ lookup('file', '/etc/pam.d/sudo') }}"
  ignore_errors: yes
  tags:
    - touchid

- name: Set sudo via Touch ID if not setup
  become: yes
  command: sed -i '' 's/auth       sufficient     pam_smartcard.so/auth       sufficient     pam_smartcard.so\nauth       sufficient     pam_tid.so/g' /etc/pam.d/sudo
  when: "'auth       sufficient     pam_tid.so' not in sudo_conf"
  tags:
    - touchid
```

Here is the breakdown of what's going on, with the key learning:

- I use the `set_fact` module to read the content of the file and store it in a `sudo_conf` variable.
- The following task uses the `when` condition to check if the `sudo_conf` variable (and therefore the file) already contains the required string. If it does, it will not run the task.
- If the string isn't present, I use `sed` to add it in the right place.
- Use `sed`'s `-i` option to edit the file in place. The version of `sed` shipping with macOS has a quirk and needs an empty string to edit in place (means no suffix). An alternative is to `brew install gnu-sed` and use `gsed -i` without the following empty string.
- Use `become: yes` to run the command as root.

And that's it, short and sweet. I'm not sure if this is the best way to do it, but it works and I learned a bit more about Ansible.
