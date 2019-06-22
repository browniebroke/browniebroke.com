import PostPreview from './post'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PostWrapper = styled.div`
  padding-bottom: 1rem;
`

const PostsList = ({ posts }) => {
  return posts.map(({ node }) => (
    <PostWrapper>
      <PostPreview
        key={node.fields.slug}
        slug={node.fields.slug}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        excerpt={node.excerpt}
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
      excerpt: PropTypes.string,
    })
  ).isRequired,
}

export default PostsList
