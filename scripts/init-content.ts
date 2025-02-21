#!/usr/bin/env node

import fs from "fs";
import slugify from "slugify";
const usage = `usage: init-content.js [til|post] '<title>'`;

const scriptArgs = process.argv.slice(2);
if (scriptArgs.length < 2) {
  console.error(`Missing argument - ${usage}`);
  process.exit(1);
}

switch (scriptArgs[0]) {
  case "til":
    console.log("Initiating TIL...");
    initTIL(scriptArgs[1], scriptArgs[2]);
    break;
  case "post":
    console.log("Initiating Post...");
    initPost(scriptArgs[1]);
    break;
  default:
    console.error(`Unknown action - ${usage}`);
    process.exit(2);
}

function getDateStr() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function slugifyLower(title: string) {
  return slugify(title, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
}

function initTIL(title: string, body: string) {
  const dateStr = getDateStr();
  const slug = slugifyLower(title);
  const bodyStr = body === undefined ? "" : body;
  const data = `---
date: ${dateStr}
title: '${title}'
---

${bodyStr}
`;
  fs.writeFileSync(`src/pages/tils/${dateStr}-${slug}.md`, data, { flag: "w" });
}

function initPost(title: string) {
  const dateStr = getDateStr();
  const slug = slugifyLower(title);
  const data = `---
date: ${dateStr}
author: browniebroke
title: '${title}'
description: ''
header_image: header.png
tags:
  - cake
---
`;
  const dir = `src/pages/blog/${dateStr}-${slug}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.md`, data, { flag: "w" });
}
