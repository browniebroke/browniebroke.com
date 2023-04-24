import React from 'react'
import { useBreakpointValue, Box, Icon, Button } from '@chakra-ui/react'
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
      marginBottom={8}
    >
      <Box marginBottom={{ base: 4, md: '0' }}>{dateTimeToRead}</Box>
      <Button
        as="a"
        variant="outline"
        leftIcon={<Icon as={FaGithub} />}
        href={editUrl}
        size="sm"
        width={{ base: '100%', md: 'auto' }}
        title="Edit on Github"
        rel="noopener noreferrer"
        target="_blank"
      >
        Edit on Github
      </Button>
    </Box>
  )
}
