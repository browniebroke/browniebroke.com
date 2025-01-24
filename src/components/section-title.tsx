import React from 'react'
import { AcceptsChildren } from './types'

export const SectionTitle = ({ children }: AcceptsChildren) => (
  <h2 className="text-2xl text-center my-12 [&_svg]:inline [&_svg]:align-left [&_svg]:align-top [&_svg]:h-[0.5em]">
    {children}
  </h2>
)
