import React from "react";
import type { AcceptsChildren } from "./types";

export const Stack = ({ children }: AcceptsChildren) => (
  <div className="flex flex-row gap-2">{children}</div>
);
