import { PostPreview, PostPreviewData } from './post'
import React from 'react'
import { Box } from '@chakra-ui/react'

interface PostsListProps {
  posts: PostPreviewData[]
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Box paddingBottom={4} key={post.fields.slug}>
          <PostPreview post={post} />
        </Box>
      ))}
    </>
  )
}
