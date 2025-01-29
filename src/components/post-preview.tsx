import React from "react";

// @ts-ignore
import { makePostUrl } from "../utils/routes";

export interface PostPreviewData {
  title: string;
  description: string;
  date: string;
  filePath: string;
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
      <small>{post.date}</small>
      <div className="mt-4">{post.description}</div>
    </article>
  );
};
