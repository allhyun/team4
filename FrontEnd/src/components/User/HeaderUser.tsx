import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const HeaderUser = () => {
  const [userMenuClicked, setUserMenuClicked] = useState<boolean>(false);
  // 로그인 로그아웃에 따른 상태 변화
  const loginUser: any = useSelector((state: any) => state.user.user);

  const userMenuHandler = () => {
    setUserMenuClicked(!userMenuClicked);
    console.log('click');
  };

  return (
    <div>
      {loginUser.u_idx === null ? (
        <Link to="/login">로그인</Link>
      ) : (
        <div className="logined-user" onClick={userMenuHandler}>
          <div>{`${loginUser.nickname}`}</div>
          <img
            src={`${process.env.REACT_APP_HOST}/${loginUser.u_img}`}
            alt=""
          />
        </div>
      )}
      {userMenuClicked && loginUser.u_idx !== null && (
        <UserMenu setUserMenuClicked={setUserMenuClicked} />
      )}
    </div>
  );
};

export default HeaderUser;
