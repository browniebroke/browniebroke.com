# gatsby-remark-external-links

Adds the target and rel attributes to external links in markdown.

This is a vendored version of [the npm package ``](https://www.npmjs.com/package/gatsby-remark-external-links) which is has a few open issues at the moment due to dependencies not being updated.

The plugin itself is pretty small, the core of the functionality is in the dependecy, so it makes sense to vendor.

## Usage

Add following to your `gatsby-config.js`:

```js
    plugins: [
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow"
            }
          }
          ]
        }
      },
```

#### options

##### target

Type: `string`
Default: `_blank`

Specifies where to display the linked URL.
The value should be on of : `_self`, `_blank`, `_parent`, `_top`

_You can specify `null` to not add the `target` attribute to your links_

##### rel

Type: `string`
Default: `nofollow noopener noreferrer`

Specifies the relationship of the target object to the link object.
The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).

_You can specify `null` to not add the `rel` attribute to your links_
