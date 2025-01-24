import { AcceptsChildren } from './types'
import React from 'react'

export const Kbd = ({ children }: AcceptsChildren) => (
  <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 border border-gray-300 rounded">
    {children}
  </kbd>
)
