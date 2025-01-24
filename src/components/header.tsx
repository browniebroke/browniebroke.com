import React from 'react'
import { Link } from 'gatsby'
import { AcceptsChildren } from './types'

export const HeaderWrapper = ({ children }: AcceptsChildren) => (
  <header className="shadow-[0_30px_20px_-32px_rgba(29,33,41,0.15)]">
    {children}
  </header>
)

export const HeaderContainer = ({ children }: AcceptsChildren) => (
  <div className="p-6 max-w-[1300px] mx-auto flex">{children}</div>
)

interface HeaderProps {
  siteTitle: String
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 className="m-0 flex-grow text-lg leading-inherit">
        <Link to="/" className="inherit-color">
          {siteTitle}
        </Link>
      </h1>
      <div className="flex flex-row gap-8">
        <Link to="/tils/" className="inherit-color">
          TILs
        </Link>
        <Link to="/blog/" className="inherit-color">
          Blog
        </Link>
      </div>
    </HeaderContainer>
  </HeaderWrapper>
)
