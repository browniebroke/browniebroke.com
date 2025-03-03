---
date: 2025-03-03
author: browniebroke
title: "Introducing django-remake-migrations"
description: "Squashing Django migrations in a medium to large Django project can be tedious and error-prone. Introducing a pluggable Django app to make it quick and easy."
header_image: _remake-migrations-header.png
tags:
  - django
  - python
  - migrations
  - database
---

Django [migrations](https://docs.djangoproject.com/en/stable/topics/migrations/) framework is a great tool to evolve your database schema over time allowing you to make pretty much any change to your data model (create/drop tables, add, change or remove columns, create or drop index) as well as writing data migrations when you need to move data around. Each time you make a change to your model, Django creates a new migration file with the diff. Sometimes it changes the database, but sometimes it's only changing the model state.

However, it can easily become an append-only system, and on a project of a decent size (medium to large), historical migrations can start to slow down your development cycle, for example if you run all migrations on CI, or for deployment preview environment linked to each pull request. In these 2 cases, it's quite common to run all migrations from scratch, and once the project went through enough model changes, it can easily take several minutes.

## The built-in way

Django provides a built-in `squashmigrations` command to help reduce the amount of migrations files, it works on a single app and takes a range of migrations to merge together into a single file, trying to optimize the operations along the way. However, Django - having the user base it has - needs to be absolutely certain and correct about which optimizations to perform, and it is conservative in terms of optimizations.

A bigger problem, in my opinion, is the limitation to work a single app only. Projects tend to make use of Django apps to modularize the codebase, but without strict guardrails, it's very easy to introduce circular inter-apps dependencies and after enough time, it becomes practically impossible to squash migrations. You want to squash migrations in app A, but they depend on app B. App B depends on app C which in turn depends on app A. If your project has a dozen apps, you quickly get many cycles like this.

## How it works

The built-in squash migration command works by looking at all the operations in the migration files, putting them all together in a single file. But what happens when the squash migrations are deployed? How does Django know to not run them again and create a table that in fact already exists? It's marking the new migration file as replacing the original migrations. Here is an example, consider the following 2 migrations files:

```python
# 0001_initial.py
class Migration(migrations.Migration):
    initial = True

    operations = [
        migrations.CreateModel(
            name="Book",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
    ]

# 0002_add_title.py
class Migration(migrations.Migration):
    dependencies = [
        ("library", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="title",
            field=models.CharField(
                max_length=255,
            ),
        ),
    ]
```

If we squash them, we'd probably get something along these lines:

```python {5-8}
# 0001_squashed_initial
class Migration(migrations.Migration):
    initial = True

    replaces = [
        ("library", "0001_initial"),
        ("library", "0002_add_title"),
    ]

    operations = [
        migrations.CreateModel(
            name="Book",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="book",
            name="title",
            field=models.CharField(
                max_length=255,
            ),
        ),
    ]
```

Notice how the 2 operations are put together in the same file, and the squashed migration file is marked as replacement of the previous 2 using the `replaces` attribute. This is what tells Django not actually execute the operations in the squashed migration file, unless the migrations it replaces haven't run.

## Introducing django-remake-migrations

Building on this feature, [django-remake-migrations](https://github.com/browniebroke/django-remake-migrations) bring the power of `squashmigrations` to all the first party apps in your project. It provides a new command called `remakemigrations` that:

1. Delete all the migration files
2. Call Django's `makemigrations` command to generate the minimum number of files and operations from scratch
3. Mark all these new migrations as squashed using the `replaces` attribute, to prevent them from executing on system which are fully migrated.

However, this comes with a pretty big caveat: the `replaces` field is pretty much guaranteed to be wrong in terms of which migrations are replaced by which, but if all your deployments are fully migrated, it doesn't matter much in practice.

On a medium-sized project, it can be tricky to time such deployment and avoid conflicting with another teammate who might add a migration somewhere. For that, I highly recommend using [django-linear-migrations](https://github.com/adamchainz/django-linear-migrations) as it will help you flag such conflict in git, hence preventing unknowingly concurrent merges. The library provides an integration hook to regenerate max-migrations files at the end. There are a few options if you need to include some database extensions or if you want to prioritize certain apps to generate migrations for.

## Conclusion

This probably won't work on very large codebases with 100's of devs, or for projects that don't fully control all the deployments. However, I believe it works quite well for a vast majority of Django codebases, where a few dozen people work on the project at once.
