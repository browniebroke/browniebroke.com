---
date: 2019-05-01
author: browniebroke
title: 'Add cache-control header to an entire S3 Bucket using Boto3'
description: 'How to change cache-control header for multiple objects in a AWS S3 bucket using boto3.'
tags:
  - boto3
  - aws
  - s3
  - bucket
  - python
  - python3
  - cache-control
---

I recently came across a task which seem pretty generic, but for which I couldn't find an existing solution online: update the `Cache-Control` header for an entire S3 bucket **using boto3**.

## Existing solutions

- Do it through the AWS management console, but I wanted to script it.
- Do it using [Boto 2](http://www.dhimanvivek.com/boto/s3-add-metadata-cache-control-header-to-key), but this is no longer installed on our system, I didn't want to reintroduce an outdated dependency.

## Boto3 solution

After a bit of fiddling and digging through the documentation, I came up with this pretty simple script:

```python
s3 = boto3.resource('s3')
bucket = s3.Bucket('my-public-bucket')
for summary in bucket.objects.filter(Prefix='static'):
    obj = summary.Object()
    obj.copy_from(
        CopySource={'Bucket': 'my-public-bucket', 'Key': obj.key},
        CacheControl='public,max-age=604800,immutable',
        MetadataDirective='REPLACE',
    )
```

The value depends a lot on your use case, you might want ot read the excellent [Cache-Control for civilians](https://csswizardry.com/2019/03/cache-control-for-civilians/) post which goes into detail.

This solution uses the [`copy_from` API](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Object.copy_from), which a bit of an unnatural API for achieving this goal, but it does the trick, and seems to be the only way at the moment. Hopefully this may help others.

## Failures to get there:

- I initially tried via the [`put` API](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Object.put), but this actually overrides the existing file with an empty one, which is not what I wanted.
- The copy to itself operation failed without `MetadataDirective='REPLACE'`. I was about to give up but then discovered about it.
