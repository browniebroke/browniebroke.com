import React from "react";
import type { AcceptsChildren } from "./types";

export const Container = ({ children }: AcceptsChildren) => (
  <div className="container mx-auto pt-12 pb-6 px-4 max-w-xl min-h-screen">
    {children}
  </div>
);
