import { getCollection } from "astro:content";
import getReadingTime from "reading-time";

import { formatLongDate } from "./dates.ts";
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
  allBlogPosts = allBlogPosts.toSorted(byMostRecent)
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
