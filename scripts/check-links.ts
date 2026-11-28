#!/usr/bin/env node

// Check that every internal link, image and feed link of the built site
// (dist/) points to a file that exists, and that every redirect leads to an
// existing page. Links to other websites are never fetched.
// Usage: npm run build && npm run check:links

import fs from "fs";
import path from "path";
import { site } from "../src/data/siteMetadata.ts";
import { redirects } from "../src/redirects.ts";

interface Redirect {
  from: string;
  to: string;
  source: string;
}

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteOrigin = new URL(site.siteUrl).origin;
const feeds = ["rss.xml", "tils.xml"];

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
};

function decodeEntities(value: string): string {
  return value.replace(
    /&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,
    (match: string, entity: string) => {
      const name = entity.toLowerCase();
      if (name.startsWith("#x")) {
        return String.fromCodePoint(parseInt(name.slice(2), 16));
      }
      if (name.startsWith("#")) {
        return String.fromCodePoint(parseInt(name.slice(1), 10));
      }
      return NAMED_ENTITIES[name] ?? match;
    },
  );
}

function decodePath(pathname: string): string {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

// Path on this site that `ref` points to, or null for other websites,
// e-mail links and the like.
function toSitePath(ref: string, pageUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(ref, `${siteOrigin}${pageUrl}`);
  } catch {
    return ref;
  }
  return url.origin === siteOrigin ? decodePath(url.pathname) : null;
}

function normalise(sitePath: string): string {
  return sitePath.replace(/\/+$/, "") || "/";
}

function isFile(filePath: string): boolean {
  return fs.statSync(filePath, { throwIfNoEntry: false })?.isFile() ?? false;
}

function existsInDist(sitePath: string): boolean {
  const file = path.join(distDir, sitePath);
  const candidates = sitePath.endsWith("/")
    ? [path.join(file, "index.html")]
    : [file, path.join(file, "index.html"), `${file}.html`];
  return candidates.some(isFile);
}

function pageUrlOf(file: string): string {
  const relative = path.relative(distDir, file).split(path.sep).join("/");
  if (relative === "index.html" || relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"index.html".length)}`;
  }
  return `/${relative}`;
}

function readRedirects(): Redirect[] {
  const fromAstro = Object.entries(redirects).map(([from, config]) => ({
    from,
    to: typeof config === "string" ? config : config.destination,
    source: "src/redirects.ts",
  }));
  const toml = fs.readFileSync(path.join(rootDir, "netlify.toml"), "utf8");
  const fromNetlify = toml
    .split("[[redirects]]")
    .slice(1)
    .map((block) => ({
      from: block.match(/^\s*from\s*=\s*"([^"]*)"/m)?.[1] ?? "",
      to: block.match(/^\s*to\s*=\s*"([^"]*)"/m)?.[1] ?? "",
      source: "netlify.toml",
    }));
  return [...fromAstro, ...fromNetlify];
}

function linksInHtml(html: string): string[] {
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(<(script|style)\b[^>]*>)[\s\S]*?(<\/\2>)/gi, "$1$3");
  const refs: string[] = [];
  const tags = cleaned.matchAll(
    /<[a-z][a-z0-9-]*(?:"[^"]*"|'[^']*'|[^"'>])*>/gi,
  );
  for (const [tag] of tags) {
    const attributes = tag.matchAll(
      /\s(href|src|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/gi,
    );
    for (const attribute of attributes) {
      const name = (attribute[1] ?? "").toLowerCase();
      const value = decodeEntities(
        attribute[2] ?? attribute[3] ?? attribute[4] ?? "",
      );
      if (name === "srcset" && !value.startsWith("data:")) {
        for (const candidate of value.split(",")) {
          refs.push(candidate.trim().split(/\s+/)[0] ?? "");
        }
      } else {
        refs.push(value);
      }
    }
  }
  return refs;
}

function linksInFeed(xml: string): string[] {
  return [...xml.matchAll(/<link>([^<]*)<\/link>/g)].map((match) =>
    decodeEntities(match[1] ?? ""),
  );
}

if (!fs.existsSync(distDir)) {
  console.error("No dist/ folder found: run `npm run build` first.");
  process.exit(1);
}

const redirectList = readRedirects();
const redirectMap = new Map<string, string>();
for (const { from, to } of redirectList) {
  redirectMap.set(normalise(toSitePath(from, "/") ?? from), to);
}

// Why `sitePath` does not lead to a page, or null when it does.
// Redirects are followed, so a link to an old URL is only fine if its
// redirect ends on an existing page.
function findBreak(sitePath: string, seen: string[] = []): string | null {
  const key = normalise(sitePath);
  const destination = redirectMap.get(key);
  if (destination === undefined) {
    return existsInDist(sitePath) ? null : `${sitePath} not found`;
  }
  if (seen.includes(key)) {
    return `redirect loop at ${key}`;
  }
  const next = toSitePath(destination, "/");
  return next === null ? null : findBreak(next, [...seen, key]);
}

const brokenLinks = new Map<string, Set<string>>();

function addBrokenLink(label: string, foundOn: string): void {
  const pages = brokenLinks.get(label) ?? new Set<string>();
  pages.add(foundOn);
  brokenLinks.set(label, pages);
}

function checkLink(ref: string, pageUrl: string): void {
  const value = ref.trim();
  if (value === "" || value.startsWith("#")) {
    return;
  }
  const sitePath = toSitePath(value, pageUrl);
  if (sitePath === null) {
    return;
  }
  const reason = findBreak(sitePath);
  if (reason !== null) {
    addBrokenLink(`${value}  (${reason})`, pageUrl);
  }
}

const htmlFiles = fs
  .readdirSync(distDir, { recursive: true, encoding: "utf8" })
  .filter((name) => name.endsWith(".html"))
  .map((name) => path.join(distDir, name))
  .filter(isFile);

for (const file of htmlFiles) {
  const pageUrl = pageUrlOf(file);
  // Redirect pages generated by Astro are covered by the redirect check below
  if (redirectMap.has(normalise(pageUrl))) {
    continue;
  }
  for (const ref of linksInHtml(fs.readFileSync(file, "utf8"))) {
    checkLink(ref, pageUrl);
  }
}

for (const feed of feeds) {
  const file = path.join(distDir, feed);
  if (!isFile(file)) {
    addBrokenLink(`/${feed}  (feed not built)`, "the list of feeds");
    continue;
  }
  for (const ref of linksInFeed(fs.readFileSync(file, "utf8"))) {
    checkLink(ref, `/${feed}`);
  }
}

const brokenRedirects: string[] = [];
for (const { from, to, source } of redirectList) {
  if (from === "" || to === "") {
    brokenRedirects.push(`"${from}" -> "${to}" in ${source}: incomplete`);
    continue;
  }
  const target = toSitePath(to, "/");
  if (target === null) {
    continue;
  }
  const fromKey = normalise(toSitePath(from, "/") ?? from);
  const reason = findBreak(target, [fromKey]);
  if (reason !== null) {
    brokenRedirects.push(`${from} -> ${to} in ${source}  (${reason})`);
  }
}

if (brokenLinks.size === 0 && brokenRedirects.length === 0) {
  console.log(
    `All links work: checked ${htmlFiles.length} pages, ${feeds.length} feeds and ${redirectList.length} redirects.`,
  );
} else {
  if (brokenLinks.size > 0) {
    console.error(`${brokenLinks.size} broken link(s):`);
    for (const [label, pages] of brokenLinks) {
      console.error(`  ${label}`);
      console.error(`    found on: ${[...pages].sort().join(", ")}`);
    }
  }
  if (brokenRedirects.length > 0) {
    console.error(`${brokenRedirects.length} broken redirect(s):`);
    for (const line of brokenRedirects) {
      console.error(`  ${line}`);
    }
  }
  process.exitCode = 1;
}
