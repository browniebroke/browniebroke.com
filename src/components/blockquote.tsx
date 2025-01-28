import React from "react";
import { AcceptsChildren } from "./types";

export const BlockQuote = ({ children }: AcceptsChildren) => (
  <blockquote className="pl-4 mb-4 border-l-[5px] border-l-gray-200 italic">
    {children}
  </blockquote>
);
