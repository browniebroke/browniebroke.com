import PostPreview from './post'
import React from 'react'
import styled from 'styled-components'

const PostWrapper = styled.div`
  padding-bottom: 1rem;
`

interface Post {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
  }
  timeToRead: number
  excerpt: string
}

interface PostsListProps {
  posts: Post[]
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostWrapper key={post.fields.slug}>
          <PostPreview
            slug={post.fields.slug}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            timeToRead={post.timeToRead}
            excerpt={post.excerpt}
          />
        </PostWrapper>
      ))}
    </>
  )
}

export default PostsList
