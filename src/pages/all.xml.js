import { getFeedForAllCollections } from "../utils/feeds.js";

export async function GET(context) {
  return await getFeedForAllCollections(
    context,
    "Bruno Alla - Posts & TILs",
    "Everything I write: blog posts and Things I Learned (TILs)",
  );
}
