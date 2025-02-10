import React from "react";
import type { AcceptsChildren } from "./types";

export const HeaderWrapper = ({ children }: AcceptsChildren) => (
  <header className="shadow-[0_30px_20px_-32px_rgba(29,33,41,0.15)]">
    {children}
  </header>
);

export const HeaderContainer = ({ children }: AcceptsChildren) => (
  <div className="p-6 max-w-[1300px] mx-auto flex">{children}</div>
);

interface HeaderProps {
  siteTitle: String;
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 className="m-0 flex-grow text-lg leading-inherit">
        <a href="/" className="inherit-color">
          {siteTitle}
        </a>
      </h1>
      <div className="flex flex-row gap-8">
        <a href="/tils/" className="inherit-color">
          TILs
        </a>
        <a href="/blog/" className="inherit-color">
          Blog
        </a>
      </div>
    </HeaderContainer>
  </HeaderWrapper>
);
