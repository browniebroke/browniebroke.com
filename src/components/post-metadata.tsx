import styled from 'styled-components'

const PostMetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 400px) {
    flex-direction: row;
  }

  div {
    margin-bottom: 0.5rem;
  }
`

export default PostMetaData
