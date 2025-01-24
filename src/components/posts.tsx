import React from 'react'
import { PostPreview, PostPreviewData } from './post'

interface PostsListProps {
  posts: PostPreviewData[]
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="pb-4" key={post.fields.slug}>
          <PostPreview post={post} />
        </div>
      ))}
    </>
  )
}
