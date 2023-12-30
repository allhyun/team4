import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.scss';

export default function Sidebar() {
  const location = useLocation();

  const getActiveClass = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <aside id="sidebar" role="banner">
        <nav className="sidebar_menu">
          <ul className="menu">
            <li className={getActiveClass('/study')}>
              <Link to="/study">
                <a>스터디모집</a>
              </Link>
            </li>
            <li className={getActiveClass('/market')}>
              <Link to="/market">
                <a>중고마켓</a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
