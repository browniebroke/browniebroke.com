import React from 'react'
import {
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from 'react-icons/fa'
import { type AcceptsChildren } from './types'

interface CalloutProps extends AcceptsChildren {
  level?: 'note' | 'info' | 'warning' | 'error'
  title?: string
}

export const Callout = ({ level, title, children }: CalloutProps) => {
  if (level === undefined) {
    level = 'note'
  }
  if (title === undefined) {
    title = level
  }

  let Icon = FaInfoCircle

  switch (level) {
    case 'note':
      Icon = FaInfoCircle
      break
    case 'info':
      Icon = FaInfoCircle
      break
    case 'warning':
      Icon = FaExclamationTriangle
      break
    case 'error':
      Icon = FaTimesCircle
      break
  }

  return (
    <div className="flex items-start p-4 rounded-md bg-blue-100 border-l-4 border-blue-500">
      <div className="flex-shrink-0 mt-0.5 text-blue-500">
        <Icon className="h-5 w-5"></Icon>
      </div>
      <div className="ml-3">
        <h3 className="mt-0.5 capitalize">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  )
}
