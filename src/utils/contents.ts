import { getCollection, type CollectionEntry } from "astro:content";
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

function toPostPreviewData(post: CollectionEntry<"blog">): PostPreviewData {
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
}

export async function getPostsByMostRecent(
  maxCount?: number | undefined,
): Promise<PostPreviewData[]> {
  let allBlogPosts = await getCollection("blog");
  allBlogPosts = allBlogPosts.toSorted(byMostRecent);
  if (maxCount !== undefined && maxCount > 0) {
    allBlogPosts = allBlogPosts.slice(0, maxCount);
  }
  return allBlogPosts.map(toPostPreviewData);
}

export interface TILMetaData {
  id: string;
  title: string;
  filePath: string;
  simpleDate: string;
}

function toTILMetaData(til: CollectionEntry<"tils">): TILMetaData {
  const date = til.data.date;
  const simpleDate = `${date.toISOString().split("T")[0]}`;
  return {
    id: til.id,
    title: til.data.title,
    filePath: til.filePath || "",
    simpleDate: simpleDate,
  };
}

export async function getTILsByMostRecent(): Promise<TILMetaData[]> {
  let allTils = await getCollection("tils");
  return allTils.toSorted(byMostRecent).map(toTILMetaData);
}

export interface LatestPostEntry extends PostPreviewData {
  kind: "post";
}

export interface LatestTILEntry extends TILMetaData {
  kind: "til";
}

export type LatestEntry = LatestPostEntry | LatestTILEntry;

interface SourcePost {
  kind: "post";
  entry: CollectionEntry<"blog">;
}

interface SourceTIL {
  kind: "til";
  entry: CollectionEntry<"tils">;
}

type SourceEntry = SourcePost | SourceTIL;

function toSourcePost(entry: CollectionEntry<"blog">): SourceEntry {
  return { kind: "post", entry };
}

function toSourceTIL(entry: CollectionEntry<"tils">): SourceEntry {
  return { kind: "til", entry };
}

function bySourceMostRecent(a: SourceEntry, b: SourceEntry) {
  return byMostRecent(a.entry, b.entry);
}

function toLatestEntry(source: SourceEntry): LatestEntry {
  if (source.kind === "post") {
    return { kind: "post", ...toPostPreviewData(source.entry) };
  }
  return { kind: "til", ...toTILMetaData(source.entry) };
}

export async function getLatestEntries(
  maxCount: number,
): Promise<LatestEntry[]> {
  const allBlogPosts = await getCollection("blog");
  const allTils = await getCollection("tils");
  const allEntries = [
    ...allBlogPosts.map(toSourcePost),
    ...allTils.map(toSourceTIL),
  ];
  return allEntries
    .toSorted(bySourceMostRecent)
    .slice(0, maxCount)
    .map(toLatestEntry);
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
