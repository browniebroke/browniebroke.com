import React from "react";
import { Link } from "gatsby";
import type { AcceptsChildren } from "./types.ts";

interface TagProps extends AcceptsChildren {
  to: string;
}

export const Tag = ({ to, children }: TagProps) => {
  return (
    <Link to={to}>
      <span className="inline-block px-2 py-1 text-sm text-white font-medium bg-gray-500 rounded hover:bg-gray-600">
        {children}
      </span>
    </Link>
  );
};
