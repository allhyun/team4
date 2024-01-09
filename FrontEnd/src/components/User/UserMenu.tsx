import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { removeUserInfo } from '../../store/user.slice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const UserMenu = ({ setUserMenuClicked }: any) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    // 다른 리덕스 상태들도 삭제하는 dispatch도 추가해야 함
    // axios
    //   .get('http://localhost:8000/user/logout', {
    //     withCredentials: true,
    //   })
    //   .then((res) => console.log(res));
    // setUserMenuClicked(false);
    axios
      .get(`${process.env.REACT_APP_HOST}/user/logout`, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
    setUserMenuClicked(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="menu-wrap">
        <div className="user-menu">
          <Link to="/heart">관심 목록</Link>
          <Link to="/user">마이페이지</Link>
          <Link to="/" onClick={logoutHandler}>
            로그아웃
          </Link>
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default UserMenu;
