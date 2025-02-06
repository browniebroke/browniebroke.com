---
date: 2023-08-30
title: "Debugging redirect cycle error in Django tests"
---

I recently joined a new team with a medium-sized Django project, so naturally I tried to run django-upgrade on it. It modified a lot of URL routes and upgraded the syntax from `re_path` to `path`. However, when I ran the tests, I got some failures with the following message:

```
django.test.client.RedirectCycleError: Redirect loop detected.
```

I could see the URL being used in the test, but nothing obvious came to mind. The patterns that were changed looked fine, and the problem persisted if I reverted to the pattern in for that URL. I tried to set a breakpoint in the affected view, but it wasn't reached, where I was expecting it to. It quickly became clear that my test suddenly resolved to a different view, but which one? There are hundreds of routes in the project! I figured that the answer might be in the exception that Django raises in the test.

I wrapped my call to `self.client.get(...)` in my test into a try/except block and inspected the `RedirectCycleError` being raised:

```python {4,6,7}
class MyViewTest(TestCase):
    def test_page_not_accessible(self):
        url = reverse("my-view")
        try:
            response = self.client.get(url, follow=True)
        except RedirectCycleError as exc:
            breakpoint()

    assert response.status_code == 404
```

I ran the test again and inspected the exception from the debugger. the exception has a `last_response` attribute, which is a `HttpResponseRedirectBase`, which itself give the URL name that was used by accessing the `resolver_match.url_name` attribute. Putting it all together:

```python
class MyViewTest(TestCase):
    def test_page_not_accessible(self):
        url = reverse("my-view")
        try:
            response = self.client.get(url, follow=True)
        except RedirectCycleError as exc:
            print(exc.last_response.resolver_match.url_name)

    assert response.status_code == 404
```

That gave me a URL name which was defined as follows:

```python
from django.urls import re_path

from .views import product_redirect_view

app_name = "site"

urlpatterns = [
    re_path(r"^", product_redirect_view, name="product-redirect"),
]
```

It's higher in the list of routes, so higher priority, and is missing a trailing `$` hence matching anything. I'm not sure how it worked before, to be honest, but that's another story I need to figure out next. For now, I'm happy that I found the cause of the problem with debugging.
