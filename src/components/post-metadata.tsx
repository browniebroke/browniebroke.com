import React from 'react'
import { FaGithub } from 'react-icons/fa'

interface PostMetaDataProps {
  dateTimeToRead: string
  editUrl: string
}

export const PostMetaData = ({
  dateTimeToRead,
  editUrl,
}: PostMetaDataProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="mb-4 md:mb-0">{dateTimeToRead}</div>
      <a
        href={editUrl}
        className="w-full md:w-auto px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 inline-flex items-center justify-center gap-2 inherit-color"
        title="Edit on Github"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FaGithub className="h-4 w-4" />
        Edit on Github
      </a>
    </div>
  )
}
