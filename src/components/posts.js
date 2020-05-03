import PostPreview from './post'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PostWrapper = styled.div`
  padding-bottom: 1rem;
`

const PostsList = ({ posts }) => {
  return posts.map((post) => (
    <PostWrapper key={post.fields.slug}>
      <PostPreview
        slug={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        timeToRead={post.timeToRead}
        excerpt={post.excerpt}
      />
    </PostWrapper>
  ))
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
      timeToRead: PropTypes.number.isRequired,
      excerpt: PropTypes.string,
    })
  ).isRequired,
}

export default PostsList
