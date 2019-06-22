import PostPreview from './post'
import React from 'react'
import PropTypes from 'prop-types'

const PostsList = ({ posts }) => {
  return posts.map(({ node }) => (
    <PostPreview
      key={node.fields.slug}
      slug={node.fields.slug}
      title={node.frontmatter.title}
      date={node.frontmatter.date}
      excerpt={node.excerpt}
    />
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
