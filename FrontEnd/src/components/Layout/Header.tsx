import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../../styles/style.scss';

export default function Header() {
  const location = useLocation();
  const getActiveClass = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  const isLogined = useSelector((state: any) => console.log(state.user.user));

  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li className={getActiveClass('/')}>
              <Link to="/">dev.join()</Link>
            </li>
            <li className={getActiveClass('/login')}>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
