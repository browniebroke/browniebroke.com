import React from "react";
import type { AcceptsChildren } from "./types.ts";

interface TagProps extends AcceptsChildren {
  to: string;
}

export const Tag = ({ to, children }: TagProps) => {
  return (
    <a href={to}>
      <span className="inline-block px-2 py-1 text-sm text-white font-medium bg-gray-500 rounded hover:bg-gray-600">
        {children}
      </span>
    </a>
  );
};
