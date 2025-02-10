import React from "react";
import type { AcceptsChildren } from "./types";

export const SeeMoreStyles: React.FC<AcceptsChildren> = ({ children }) => (
  <p className="my-12 text-center">{children}</p>
);
