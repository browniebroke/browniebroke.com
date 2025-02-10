import React from "react";

export interface Page {
  id: string;
}

interface PageLinkProps {
  pageObj: Page | null;
  rel: "prev" | "next";
  pathPrefix: string;
}

interface PaginationProps {
  previous: Page | null;
  next: Page | null;
  pathPrefix: string;
}

const PageLink: React.FC<PageLinkProps> = ({ pageObj, rel, pathPrefix }) => {
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
  return (
    <>
      {pageObj ? (
        <div className="border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
          <a
            href={`/${pathPrefix}/${pageObj.id}`}
            rel={rel}
            className="inherit-color"
          >
            {label}
          </a>
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
  pathPrefix,
}) => {
  return (
    <div className="flex flex-row justify-between flex-wrap my-6">
      <PageLink pageObj={previous} rel="prev" pathPrefix={pathPrefix} />
      <PageLink pageObj={next} rel="next" pathPrefix={pathPrefix} />
    </div>
  );
};
