import { getCollection } from 'astro:content'
import getReadingTime from 'reading-time'

import { formatLongDate } from './dates.ts'
import type { PostPreviewData } from '../components/post-preview.tsx'

interface HasDateData {
  data: {
    date: Date
  }
}

function byMostRecent(a: HasDateData, b: HasDateData) {
  return Number(b.data.date) - Number(a.data.date);
}

export async function getPostsByMostRecent(maxCount?: number | undefined): Promise<PostPreviewData[]> {
  let allBlogPosts = await getCollection('blog');
  if (maxCount !== undefined && maxCount > 0) {
    allBlogPosts = allBlogPosts.slice(0, maxCount)
  }
  return allBlogPosts
    .toSorted(byMostRecent)
    .map(
      (post) => {
      const minutesRead = getReadingTime(post.body || "")
        return ({
          id: post.id,
          title: post.data.title,
          description: post.data.description,
          date: formatLongDate(post.data.date),
          filePath: post.filePath || "",
          minutesReadText: minutesRead.text,
        })
      }
  );
};