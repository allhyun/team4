import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/style.scss';
import { removeUserInfo } from '../../store/user.slice';
import axios from 'axios';

export default function Header() {
  const location = useLocation();
  const getActiveClass = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  // 로그인 로그아웃에 따른 상태 변화
  const [isLogined, setIsLogined] = useState(false);
  const loginUser: any = useSelector((state: any) => state.user.user);
  console.log('header loginUser', loginUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeUserInfo());
    // 다른 리덕스 상태들도 삭제하는 dispatch도 추가해야 함
    axios
      .get('http://localhost:8000/user/logout', {
        withCredentials: true,
      })
      .then((res) => console.log(res));
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
            <li className={getActiveClass('/login')}>
              {loginUser.u_idx === null ? (
                <Link to="/login">로그인</Link>
              ) : (
                // 로그인일 때도 logoutHanler가 작동함
                <Link to="/" onClick={logoutHandler}>
                  로그아웃
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
