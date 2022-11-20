---
date: 2022-11-18
title: 'Detecting unchanged pipx packages with Ansible'
---

I [recently moved](/tils/provisioning-my-mac-with-ansible/) provisioning of my MacBook to Ansible and one of the task that didn't work perfectly was installation of CLI packages using [pipx](https://pypa.github.io/pipx/): the playbook always detected the packages as changed, even if they were already installed.

I [solved this](https://github.com/browniebroke/mac-ansible/commit/3c24278079defbc11d63241edabd5b43378f891d) by making use of the `changed_when` option, and checking whether the output of `pipx install` was saying that the package is already installed:

```yaml{3-6}
- name: Install pipx packages
  command: pipx install {{ item }} --python ~/.pyenv/versions/{{ pyenv_python_versions[0] }}/bin/python
  register: pipx_install_result
  changed_when: >
    pipx_install_result.rc == 0 and
    "'" + item + "' already seems to be installed." not in pipx_install_result.stdout
  loop: '{{ pipx_packages }}'
  tags:
  - pipx
```

Now my packages appear as "ok" instead of "changed" when running the playbook.

Victory 🎉
