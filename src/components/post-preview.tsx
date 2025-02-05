import React from "react";

// @ts-ignore
import { makePostUrl } from "../utils/routes";

export interface PostPreviewData {
  id: string;
  title: string;
  description: string;
  date: string;
  filePath: string;
  minutesReadText: string
}

interface PostPreviewProp {
  post: PostPreviewData;
}

export const PostPreview: React.FC<PostPreviewProp> = ({ post }) => {
  return (
    <article className="mb-8">
      <h3 className="text-xl font-bold">
        <a href={makePostUrl(post.filePath)} className="inherit-color">
          {post.title}
        </a>
      </h3>
      <small>{post.date} • {post.minutesReadText}</small>
      <div className="mt-4">{post.description}</div>
    </article>
  );
};
