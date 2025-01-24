import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { AcceptsChildren } from './types'
import { BlockQuote } from './blockquote'

const MyH1 = ({ children }: AcceptsChildren) => (
  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
)

const MyH2 = ({ children }: AcceptsChildren) => (
  <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
)

const MyH3 = ({ children }: AcceptsChildren) => (
  <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>
)

const MyH4 = ({ children }: AcceptsChildren) => (
  <h4 className="text-lg font-bold mt-8 mb-4">{children}</h4>
)

const MyOrderedList = ({ children }: AcceptsChildren) => (
  <ol className="list-decimal pl-8 my-4">{children}</ol>
)

const MyUnorderedList = ({ children }: AcceptsChildren) => (
  <ul className="list-disc pl-8 my-4">{children}</ul>
)

const MyListItem = ({ children }: AcceptsChildren) => (
  <li className="my-1">{children}</li>
)

const MyParagraph = ({ children }: AcceptsChildren) => (
  <p className="my-4">{children}</p>
)

const components = {
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  h4: MyH4,
  ol: MyOrderedList,
  ul: MyUnorderedList,
  li: MyListItem,
  p: MyParagraph,
  blockquote: BlockQuote,
}

export const MDXWrapper = ({ children }: AcceptsChildren) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
