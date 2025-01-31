---
date: 2023-04-20
title: 'Translated database content with Django'
---

Recently, while working on a Django project, I needed to have content in multiple languages. Django has a good support for [translations](https://docs.djangoproject.com/en/stable/topics/i18n/translation/), but that's only strings which are in the codebase. It's not uncommon to need models with content in the database that will be displayed to end user, getting into CMS territory, and these need to be translated. However, for my use case, I was just modeling a couple of fields, and it's an API backend, with an SPA frontend, so I didn't want to install something too complicated like Wagtail. I just needed a lightweight solution, that can work from the admin.

At a previous company, we wrote a custom implementation which relied on JSON field on the same model, and it worked well, but it wasn't fully integrated into the admin and we never open sourced it. So I was left with trying to find a similar implementation.

## Rejected options

I looked at a few options, and rejected them for the following reasons:

- [django-parler](https://django-parler.readthedocs.io): I've used it in the past, and it posed some issues. The main annoyance was that the translations were stored in a separate model, causing joins and extra queries. It also doesn't appear well maintained: at time of writing, the last release is 1,5 years old, and it's 2 Django versions behind in terms of support.
- [django-modeltranslation](https://django-modeltranslation.readthedocs.io): a popular option, but creates one column per translated field per language, which is not optimal.

## The solution

I ended up on [django-modeltrans](https://django-modeltrans.readthedocs.io), which is using a single JSONField for all translations, is well integrated into the admin and supports modern versions of Django. Adding a model with translated fields is as simple as:

```python{8}
from django.db import models
from modeltrans.fields import TranslationField

class MyModel(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    i18n = TranslationField(fields=("name", "description"))

    class Meta:
        verbose_name = "My model"
        verbose_name_plural = "My models"
```

This is pretty straightforward and very obvious that this model has translations and which are translated.

The admin integration can be customised with the built-in `ActiveLanguageMixin`, which limits shows the default language + the active language. In my case I had only 2 languages, so I copied that mixin in my codebase and tweaked it for my need. It's short (~10 lines, with comments), so that was relatively easy to do.

For simple cases, I highly recommend this package, it's simple and efficient. If your app is content heavy though, I'd recommend looking into a more fully fledged solution like Wagtail.
