import slugify from "slugify";

function makeUrlFrom(filePath: string): string {
  return filePath.replace(`src/pages`, "").split(".")[0];
}

export const makePostUrl = (filePath: string) => {
  return makeUrlFrom(filePath.replace(`/index.mdx`, "").replace(`/index.md`, ""));
}
export const makeTILUrl = (filePath: string) => makeUrlFrom(filePath);
export const makeTagUrl = (tagName: string) => `/blog/tags/${slugify(tagName)}`;
