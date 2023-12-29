import React from 'react';
import '../../styles/style.scss';

export default function Header() {
  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li>
              <a href="/">로고이미지</a>
            </li>
            <li>
              <a href="/study">로그인</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
