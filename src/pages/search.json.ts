import type { APIRoute } from "astro";

import { getSearchEntries } from "../utils/contents.ts";

export const GET: APIRoute = async () => {
  const entries = await getSearchEntries();
  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json" },
  });
};
