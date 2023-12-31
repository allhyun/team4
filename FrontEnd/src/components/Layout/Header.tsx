import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.scss';

export default function Header() {
  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li>
              <Link to="/">
                <a>dev.join()</a>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <a>로그인</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
