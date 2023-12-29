import React from 'react';
import '../../styles/style.scss';
import MarketMain from '../MarketMain/MarketMain';
import StudyMainPage from '../../pages/Study/StudyMainPage';

export default function Sidebar() {
  return (
    <>
      <header id="sidebar" role="banner">
        <nav className="sidebar_menu">
          <ul className="menu">
            <li>
              <a href="/study">스터디모집</a>
            </li>
            <li>
              <a href="/product">중고마켓</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
