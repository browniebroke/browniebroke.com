import React from 'react'
import { Box, useBreakpointValue, Link as ChakraLink } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

interface PostMetaDataProps {
  dateTimeToRead: string
  editUrl: string
}

export const PostMetaData = ({
  dateTimeToRead,
  editUrl,
}: PostMetaDataProps) => {
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' }) as
    | 'row'
    | 'column'

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      justifyContent="space-between"
      alignItems="center"
      marginBottom="1rem"
    >
      <Box>{dateTimeToRead}</Box>
      <Box>
        <ChakraLink href={editUrl} title="Edit on Github" isExternal>
          <FaGithub />
          Edit on Github
        </ChakraLink>
      </Box>
    </Box>
  )
}
