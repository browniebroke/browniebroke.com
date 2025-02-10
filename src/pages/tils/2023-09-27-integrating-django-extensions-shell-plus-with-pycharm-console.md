---
date: 2023-09-27
title: "Integrating django-extensions shell plus with Pycharm console"
---

The `django-extensions` is a package which I install in all my Django projects, it's a toolbox full of useful commands and utilities. One of the commands is `shell_plus` which is a replacement for the standard Django `shell` command, than provides a better DX, close the iPython, as well as automatically importing all the models as well as the most common utilities. As a Pycharm user, I often use the integrated console, which responds to the IDE shortcuts and provides other small DX improvements, similar to what ` shell_plus` offers.

By default, Pycharm integrated console does not do the automatic imports from `shell_plus`, but it's quite easy to add them, hence getting the best of both worlds. Here are the steps:

1. Open the settings
2. Go to the `Build, Execution, Deployment` > `Console` > `Django Console` page
3. Add the following to the end of the `Starting script` field:

   ```python {7-10}
   import sys; print('Python %s on %s' % (sys.version, sys.platform))
   import django; print('Django %s' % django.get_version())
   sys.path.extend([WORKING_DIR_AND_PYTHON_PATHS])
   if 'setup' in dir(django): django.setup()
   import django_manage_shell; django_manage_shell.run(PROJECT_ROOT)

   from django_extensions.management import shells
   from django.core.management.color import color_style
   imported_items = shells.import_objects({}, color_style())
   for k, v in imported_items.items(): globals()[k] = v
   ```

And that's it! Now when you open the Pycharm console, all your models and utilities will be available, using the `shell_plus` logic.
