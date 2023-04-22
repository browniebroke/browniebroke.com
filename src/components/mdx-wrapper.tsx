import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { AcceptsChildren } from './types'
import { Heading, UnorderedList, ListItem, Text } from '@chakra-ui/react'

const MyH1 = ({ children }: AcceptsChildren) => (
  <Heading as="h1" size="lg">
    {children}
  </Heading>
)

const MyH2 = ({ children }: AcceptsChildren) => (
  <Heading as="h2" size="md">
    {children}
  </Heading>
)

const MyH3 = ({ children }: AcceptsChildren) => (
  <Heading as="h3" size="sm">
    {children}
  </Heading>
)

const MyH4 = ({ children }: AcceptsChildren) => (
  <Heading as="h4" size="xs">
    {children}
  </Heading>
)

const components = {
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  h4: MyH4,
  ul: UnorderedList,
  li: ListItem,
  p: Text,
}

export const MDXWrapper = ({ children }: AcceptsChildren) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
