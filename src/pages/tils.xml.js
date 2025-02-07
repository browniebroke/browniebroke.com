import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const tils = await getCollection("tils");
  return rss({
    // `<title>` field in output xml
    title: "Bruno Alla - TILs",
    // `<description>` field in output xml
    description: "Things I Learned (TILs)",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: tils.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/tils/${entry.id}`,
      pubDate: entry.data.date,
      content: entry.rendered.html,
    })),
  });
}
