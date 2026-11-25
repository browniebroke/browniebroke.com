import React from "react";

// @ts-ignore
import { makePostUrl } from "../utils/routes";
import { KindBadge } from "./kind-badge";

export interface PostPreviewData {
  id: string;
  title: string;
  description: string;
  date: string;
  filePath: string;
  minutesReadText: string;
  tags: string[];
}

interface PostPreviewProp {
  post: PostPreviewData;
  showKind?: boolean;
}

export const PostPreview: React.FC<PostPreviewProp> = ({
  post,
  showKind = false,
}) => {
  return (
    <article className="mb-8">
      <h3 className="text-xl font-bold">
        {showKind && <KindBadge kind="post" />}
        <a href={makePostUrl(post.filePath)} className="inherit-color">
          {post.title}
        </a>
      </h3>
      <small>
        {post.date} • {post.minutesReadText}
      </small>
      <div className="mt-4">{post.description}</div>
    </article>
  );
};
