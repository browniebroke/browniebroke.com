import { getFeedForCollection } from "../utils/feeds.js";

export async function GET(context) {
  return await getFeedForCollection(
    "tils",
    context,
    "Bruno Alla - TILs",
    "Things I Learned (TILs)",
  );
}
