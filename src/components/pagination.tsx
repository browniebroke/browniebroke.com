import React from "react";
import { Link } from "gatsby";

// @ts-ignore
import { makePostUrl } from "../utils/routes";

export interface Page {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
}

interface PageLinkProps {
  pageObj: Page | null;
  rel: "prev" | "next";
  makeUrlFunc: Function | null;
}

interface PaginationProps {
  previous: Page | null;
  next: Page | null;
  makeUrlFunc?: (slug: string) => string;
}

const PageLink: React.FC<PageLinkProps> = ({ pageObj, rel, makeUrlFunc }) => {
  let label = "";
  switch (rel) {
    case "prev":
      label = "← Previous";
      break;
    case "next":
      label = "Next →";
      break;
    default:
      label = "";
  }
  const makeUrl = makeUrlFunc !== null ? makeUrlFunc : makePostUrl;
  return (
    <>
      {pageObj ? (
        <div className="border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
          <Link
            to={makeUrl(pageObj.fields.slug)}
            rel={rel}
            title={pageObj.frontmatter.title}
            className="inherit-color"
          >
            {label}
          </Link>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </>
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  previous = null,
  next = null,
  makeUrlFunc = null,
}) => {
  return (
    <div className="flex flex-row justify-between flex-wrap my-6">
      <PageLink pageObj={previous} rel="prev" makeUrlFunc={makeUrlFunc} />
      <PageLink pageObj={next} rel="next" makeUrlFunc={makeUrlFunc} />
    </div>
  );
};
