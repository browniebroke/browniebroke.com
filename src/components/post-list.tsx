import React from "react";
import { PostPreview, type PostPreviewData } from "./post-preview";
import { KindBadge } from "./kind-badge";
import { makeTILUrl } from "../utils/routes";
import type { LatestEntry } from "../utils/contents";

interface PostsListProps {
  posts: PostPreviewData[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="pb-4" key={post.filePath}>
          <PostPreview post={post} />
        </div>
      ))}
    </>
  );
};

interface LatestEntriesListProps {
  entries: LatestEntry[];
}

export const LatestEntriesList: React.FC<LatestEntriesListProps> = ({
  entries,
}) => {
  return (
    <>
      {entries.map((entry) => (
        <div className="pb-4" key={entry.filePath}>
          {entry.kind === "post" ? (
            <PostPreview post={entry} showKind />
          ) : (
            <article className="mb-8">
              <h3 className="text-xl font-bold mb-1">
                <KindBadge kind="til" />
                <a href={makeTILUrl(entry.filePath)} className="inherit-color">
                  {entry.title}
                </a>
              </h3>
              <small>{entry.simpleDate}</small>
            </article>
          )}
        </div>
      ))}
    </>
  );
};
