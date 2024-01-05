import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../../styles/style.scss';
import { removeUserInfo } from '../../store/user.slice';

export default function Header() {
  const location = useLocation();
  const getActiveClass = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  const [isLogined, setIsLogined] = useState(false);
  const loginUser: any = useSelector((state: any) => state.user.user.uid);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    // 쿠키 삭제 추가 예정
  };

  useEffect(() => {
    setIsLogined(loginUser !== null);
  }, [loginUser]);

  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li className={getActiveClass('/')}>
              <Link to="/">dev.join()</Link>
            </li>
            <li className={getActiveClass('/login')} onClick={logoutHandler}>
              {isLogined ? (
                <Link to="/" onClick={logoutHandler}>
                  로그아웃
                </Link>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
