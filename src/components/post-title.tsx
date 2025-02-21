import React from "react";
import type { AcceptsChildren } from "./types";

export const PostTitle = ({ children }: AcceptsChildren) => (
  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
);
