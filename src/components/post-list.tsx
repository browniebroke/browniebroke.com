import React from "react";
import { PostPreview, type PostPreviewData } from "./post-preview";

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
