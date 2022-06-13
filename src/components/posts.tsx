import { PostPreview, PostPreviewData } from './post'
import React from 'react'
import styled from 'styled-components'

const PostWrapper = styled.div`
  padding-bottom: 1rem;
`

interface PostsListProps {
  posts: PostPreviewData[]
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostWrapper key={post.fields.slug}>
          <PostPreview post={post} />
        </PostWrapper>
      ))}
    </>
  )
}
