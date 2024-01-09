import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.scss';
import axios from 'axios';
import HeaderUser from '../User/HeaderUser';

export default function Header() {
  const location = useLocation();
  const getActiveClass = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li className={getActiveClass('/')}>
              <Link to="/">dev.join()</Link>
            </li>
            <li className={getActiveClass('/login')}>
              <HeaderUser />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
