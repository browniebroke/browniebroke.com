#!/usr/bin/env node

const fs = require('fs')
const slugify = require('slugify')
const usage = `usage: init-til.js [til|post] '<title>'`

const scriptArgs = process.argv.slice(2)
if (scriptArgs.length < 2) {
  console.error(`Missing argument - ${usage}`)
  process.exit(1)
}

switch (scriptArgs[0]) {
  case 'til':
    console.log('Initiating TIL...')
    initTIL(scriptArgs[1])
    break
  case 'post':
    console.log('Initiating Post...')
    break
  default:
    console.error(`Unknown action - ${usage}`)
    process.exit(2)
}

function getDateStr() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

function initTIL(title) {
  const dateStr = getDateStr()
  const slug = slugify(title)
  const data = `---
date: ${dateStr}
title: '${title}'
---
`
  fs.writeFileSync(`src/tils/${dateStr}-${slug}.md`, data, { flag: 'w' })
}
