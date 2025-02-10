import type { RedirectConfig } from "astro";

export const redirects: Record<string, RedirectConfig> = {
  "/blog/migrating-from-chakra-ui-to-tailwind-css/": {
    status: 302,
    destination: "/blog/2025-01-24-migrating-from-chakra-ui-to-tailwind-css/",
  },
  "/blog/testing-your-python-logging-like-a-boss/": {
    status: 302,
    destination: "/blog/2024-12-13-testing-your-python-logging-like-a-boss/",
  },
  "/blog/manage-deprecations-with-python-warnings-in-a-django-project/": {
    status: 302,
    destination:
      "/blog/2024-11-22-manage-deprecations-with-python-warnings-in-a-django-project/",
  },
  "/blog/keep-uv-lock-file-up-to-date-with-dependabot-updates/": {
    status: 302,
    destination:
      "/blog/2024-10-02-keep-uv-lock-file-up-to-date-with-dependabot-updates/",
  },
  "/blog/narrow-state-of-a-django-model-using-python-typeguard/": {
    status: 302,
    destination:
      "/blog/2024-08-31-narrow-state-of-a-django-model-using-python-typeguard/",
  },
  "/blog/attest-build-provenance-for-a-python-package-in-github-actions/": {
    status: 302,
    destination:
      "/blog/2024-08-08-attest-build-provenance-for-a-python-package-in-github-actions/",
  },
  "/blog/bulk-updating-multiple-repos-with-all-repos/": {
    status: 302,
    destination:
      "/blog/2023-07-10-bulk-updating-multiple-repos-with-all-repos/",
  },
  "/blog/nested-viewsets-with-django-rest-framework/": {
    status: 302,
    destination: "/blog/2023-05-05-nested-viewsets-with-django-rest-framework/",
  },
  "/blog/migrate-my-site-design-system-to-chakra-ui-with-chatgpt/": {
    status: 302,
    destination:
      "/blog/2023-04-27-migrate-my-site-design-system-to-chakra-ui-with-chatgpt/",
  },
  "/blog/enabling-sudo-via-touchid-using-ansible/": {
    status: 302,
    destination: "/blog/2022-11-25-enabling-sudo-via-touchid-using-ansible/",
  },
  "/blog/specify-docs-dependency-groups-with-poetry-and-read-the-docs/": {
    status: 302,
    destination:
      "/blog/2022-11-21-specify-docs-dependency-groups-with-poetry-and-read-the-docs/",
  },
  "/blog/convert-existing-poetry-to-src-layout/": {
    status: 302,
    destination: "/blog/2022-01-19-convert-existing-poetry-to-src-layout/",
  },
  "/blog/convert-requirements-to-pyproject/": {
    status: 302,
    destination: "/blog/2021-01-07-convert-requirements-to-pyproject/",
  },
  "/blog/migrating-project-to-poetry/": {
    status: 302,
    destination: "/blog/2020-10-18-migrating-project-to-poetry/",
  },
  "/blog/gh-action-pre-commit-autoupdate/": {
    status: 302,
    destination: "/blog/2020-07-12-gh-action-pre-commit-autoupdate/",
  },
  "/blog/flexbox-zombie/": {
    status: 302,
    destination: "/blog/2020-05-03-flexbox-zombie/",
  },
  "/blog/self-host-typographyjs-fonts-with-gatsby/": {
    status: 302,
    destination: "/blog/2020-01-05-self-host-typographyjs-fonts-with-gatsby/",
  },
  "/blog/setting-up-content-security-policy-gatsby/": {
    status: 302,
    destination: "/blog/2019-11-14-setting-up-content-security-policy-gatsby/",
  },
  "/blog/making-celery-work-nicely-with-django-transactions/": {
    status: 302,
    destination:
      "/blog/2019-06-25-making-celery-work-nicely-with-django-transactions/",
  },
  "/blog/static-vs-media-in-django/": {
    status: 302,
    destination: "/blog/2019-06-18-static-vs-media-in-django/",
  },
  "/blog/add-cache-control-header-entire-s3-bucket-with-boto3/": {
    status: 302,
    destination:
      "/blog/2019-05-01-add-cache-control-header-entire-s3-bucket-with-boto3/",
  },
  "/blog/how-i-made-1000-of-website-more-secure/": {
    status: 302,
    destination: "/blog/2019-04-24-how-i-made-1000-of-website-more-secure/",
  },
  "/blog/new-year-new-laptop/": {
    status: 302,
    destination: "/blog/2018-01-14-new-year-new-laptop/",
  },
  "/blog/hello-world/": {
    status: 302,
    destination: "/blog/2017-11-29-hello-world/",
  },
  "/tils/docker-add-vs-copy-instructions/": {
    status: 302,
    destination: "/tils/2024-12-02-docker-add-vs-copy-instructions/",
  },
  "/tils/add-button-to-share-on-mastodon-to-my-posts/": {
    status: 302,
    destination:
      "/tils/2024-11-29-add-button-to-share-on-mastodon-to-my-posts/",
  },
  "/tils/javascript-console-log-object-string-substitution/": {
    status: 302,
    destination:
      "/tils/2024-11-27-javascript-console-log-object-string-substitution/",
  },
  "/tils/james-bennets-djangover-suggestion/": {
    status: 302,
    destination: "/tils/2024-11-25-james-bennets-djangover-suggestion/",
  },
  "/tils/new-argument-to-django-redirects/": {
    status: 302,
    destination: "/tils/2024-11-24-new-argument-to-django-redirects/",
  },
  "/tils/improve-django-development-experience-with-django-fastdev/": {
    status: 302,
    destination:
      "/tils/2024-11-22-improve-django-development-experience-with-django-fastdev/",
  },
  "/tils/bluesky-action-intent-links/": {
    status: 302,
    destination: "/tils/2024-11-18-bluesky-action-intent-links/",
  },
  "/tils/trigger-further-workflows-on-pushes-from-github-actions/": {
    status: 302,
    destination:
      "/tils/2024-10-02-trigger-further-workflows-on-pushes-from-github-actions/",
  },
  "/tils/opening-the-pycharm-registry/": {
    status: 302,
    destination: "/tils/2024-07-17-opening-the-pycharm-registry/",
  },
  "/tils/python-print-function-keyword-arguments/": {
    status: 302,
    destination: "/tils/2024-05-08-python-print-function-keyword-arguments/",
  },
  "/tils/crossed-app-logo-in-macos-notifications/": {
    status: 302,
    destination: "/tils/2024-03-13-crossed-app-logo-in-macos-notifications/",
  },
  "/tils/running-python-from-subprocess-cross-platforms/": {
    status: 302,
    destination:
      "/tils/2023-11-04-running-python-from-subprocess-cross-platforms/",
  },
  "/tils/integrating-django-extensions-shell-plus-with-pycharm-console/": {
    status: 302,
    destination:
      "/tils/2023-09-27-integrating-django-extensions-shell-plus-with-pycharm-console/",
  },
  "/tils/debugging-redirect-cycle-error-in-django-tests/": {
    status: 302,
    destination:
      "/tils/2023-08-30-debugging-redirect-cycle-error-in-django-tests/",
  },
  "/tils/using-the-python-inspect-module-to-load-test-data/": {
    status: 302,
    destination:
      "/tils/2023-08-07-using-the-python-inspect-module-to-load-test-data/",
  },
  "/tils/terraform-and-ecs-task-revisions/": {
    status: 302,
    destination: "/tils/2023-05-05-terraform-and-ecs-task-revisions/",
  },
  "/tils/bulk-resize-images-with-sips/": {
    status: 302,
    destination: "/tils/2023-05-04-bulk-resize-images-with-sips/",
  },
  "/tils/translated-database-content-with-django/": {
    status: 302,
    destination: "/tils/2023-04-20-translated-database-content-with-django/",
  },
  "/tils/python-descriptors/": {
    status: 302,
    destination: "/tils/2023-02-07-python-descriptors/",
  },
  "/tils/detecting-unchanged-pipx-packages-with-ansible/": {
    status: 302,
    destination:
      "/tils/2022-11-18-detecting-unchanged-pipx-packages-with-ansible/",
  },
  "/tils/provisioning-my-mac-with-ansible/": {
    status: 302,
    destination: "/tils/2022-11-17-provisioning-my-mac-with-ansible/",
  },
  "/tils/sudo-with-touchid-on-macos/": {
    status: 302,
    destination: "/tils/2022-08-31-sudo-with-touchid-on-macos/",
  },
  "/tils/using-codespell-to-check-for-typos/": {
    status: 302,
    destination: "/tils/2022-05-07-using-codespell-to-check-for-typos/",
  },
  "/tils/using-a-temporary-directory-for-media-files-while-running-tests-in-django/":
    {
      status: 302,
      destination:
        "/tils/2022-05-05-using-a-temporary-directory-for-media-files-while-running-tests-in-django/",
    },
  "/tils/tracking-down-bug-with-tox-and-git/": {
    status: 302,
    destination: "/tils/2022-05-03-tracking-down-bug-with-tox-and-git/",
  },
  "/tils/adding-til-to-my-site/": {
    status: 302,
    destination: "/tils/2022-05-01-adding-til-to-my-site/",
  },
};
