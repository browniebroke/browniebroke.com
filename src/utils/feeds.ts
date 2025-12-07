import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export const getFeedForCollection = async (
  collectionName: "blog" | "tils",
  context: any,
  title: string,
  description: string,
) => {
  const entries = await getCollection(collectionName);
  return rss({
    // `<title>` field in output xml
    title: title,
    // `<description>` field in output xml
    description: description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: entries
      // Return most recent item first
      .toSorted(
        (e1, e2) =>
          Date.parse(e2.data.date.toISOString()) -
          Date.parse(e1.data.date.toISOString()),
      )
      // Serialize the entries as expected
      .map((entry) => ({
        title: entry.data.title,
        // @ts-ignore
        description: entry.data.description,
        link: `/${collectionName}/${entry.id}`,
        pubDate: entry.data.date,
        content: sanitizeHtml(parser.render(entry?.body || ""), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      })),
  });
};
