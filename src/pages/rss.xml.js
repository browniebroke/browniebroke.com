import { getFeedForCollection } from "../utils/feeds.js";

export async function GET(context) {
  return await getFeedForCollection(
    "blog",
    context,
    "Bruno Alla's Blog",
    "My personal blog",
  );
}
