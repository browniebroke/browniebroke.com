import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import getReadingTime from "reading-time";

import { formatLongDate } from "./dates.ts";
import { makePostUrl, makeTILUrl } from "./routes.ts";
import type { PostPreviewData } from "../components/post-preview.tsx";

interface HasDateData {
  data: {
    date: Date;
  };
}

function byMostRecent(a: HasDateData, b: HasDateData) {
  return Number(b.data.date) - Number(a.data.date);
}

export async function getPostsByMostRecent(
  maxCount?: number | undefined,
): Promise<PostPreviewData[]> {
  let allBlogPosts = await getCollection("blog");
  allBlogPosts = allBlogPosts.toSorted(byMostRecent);
  if (maxCount !== undefined && maxCount > 0) {
    allBlogPosts = allBlogPosts.slice(0, maxCount);
  }
  return allBlogPosts.map((post) => {
    const minutesRead = getReadingTime(post.body || "");
    return {
      id: post.id,
      title: post.data.title,
      description: post.data.description,
      filePath: post.filePath || "",
      tags: post.data.tags,
      date: formatLongDate(post.data.date),
      minutesReadText: minutesRead.text,
    };
  });
}

interface TILMetaData {
  id: string;
  title: string;
  filePath: string;
  simpleDate: string;
}

export async function getTILsByMostRecent(): Promise<TILMetaData[]> {
  let allTils = await getCollection("tils");
  return allTils.toSorted(byMostRecent).map((til) => {
    const date = til.data.date;
    const simpleDate = `${date.toISOString().split("T")[0]}`;
    return {
      id: til.id,
      title: til.data.title,
      filePath: til.filePath || "",
      simpleDate: simpleDate,
    };
  });
}

export interface SearchEntry {
  type: "post" | "til";
  title: string;
  url: string;
  date: string;
  displayDate: string;
  tags: string[];
  description: string;
  text: string;
}

const SEARCH_TEXT_MAX_LENGTH = 2000;
const markdownParser = new MarkdownIt();

function markdownToSearchText(markdown: string): string {
  // Drop MDX import/export statements, then keep only the prose:
  // fenced code, code blocks, HTML/JSX blocks and images are left out.
  const source = markdown
    .split("\n")
    .filter((line) => !/^(import|export)\s/.test(line))
    .join("\n");
  const blocks: string[] = [];
  for (const token of markdownParser.parse(source, {})) {
    if (token.type !== "inline" || token.children === null) {
      continue;
    }
    let block = "";
    for (const child of token.children) {
      if (child.type === "text" || child.type === "code_inline") {
        block += child.content;
      } else if (child.type === "softbreak" || child.type === "hardbreak") {
        block += " ";
      }
    }
    blocks.push(block);
  }
  const text = blocks.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= SEARCH_TEXT_MAX_LENGTH) {
    return text;
  }
  const truncated = text.slice(0, SEARCH_TEXT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
}

export async function getSearchEntries(): Promise<SearchEntry[]> {
  const posts = await getCollection("blog");
  const tils = await getCollection("tils");
  const entries: SearchEntry[] = [
    ...posts.map((post) => ({
      type: "post" as const,
      title: post.data.title,
      url: makePostUrl(post.filePath || ""),
      date: post.data.date.toISOString(),
      displayDate: formatLongDate(post.data.date),
      tags: post.data.tags,
      description: post.data.description,
      text: markdownToSearchText(post.body || ""),
    })),
    ...tils.map((til) => ({
      type: "til" as const,
      title: til.data.title,
      url: makeTILUrl(til.filePath || ""),
      date: til.data.date.toISOString(),
      displayDate: formatLongDate(til.data.date),
      tags: [],
      description: "",
      text: markdownToSearchText(til.body || ""),
    })),
  ];
  // ISO 8601 date strings sort chronologically; most recent first.
  return entries.toSorted((a, b) => b.date.localeCompare(a.date));
}

interface PaginatedContent {
  id: string;
}

interface PaginatedData {
  previous: PaginatedContent | null;
  next: PaginatedContent | null;
  currentRecordIndex: number;
}

export async function getPagination(
  currentRecordId: string,
  allRecordsFunction: () => Promise<PaginatedContent[]>,
): Promise<PaginatedData> {
  const allRecords = await allRecordsFunction();
  const currentRecordIndex = allRecords
    .map((record) => record.id)
    .indexOf(currentRecordId);
  const previous = allRecords[currentRecordIndex + 1];
  const next = allRecords[currentRecordIndex - 1];
  return {
    previous,
    next,
    currentRecordIndex,
  };
}
