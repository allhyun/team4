import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.scss';
import { removeUserInfo } from '../../store/user.slice';
import axios from 'axios';
import UserMenu from './UserMenu';

const HeaderUser = () => {
  const [userMenuClicked, setUserMenuClicked] = useState<boolean>(false);

  // 로그인 로그아웃에 따른 상태 변화
  const loginUser: any = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    setUserMenuClicked(false);
    dispatch(removeUserInfo());
    // 다른 리덕스 상태들도 삭제하는 dispatch도 추가해야 함
    axios
      .get('http://localhost:8000/user/logout', {
        withCredentials: true,
      })
      .then((res) => console.log(res));
  };

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
          <img src={`http://localhost:8000/${loginUser.u_img}`} alt="" />
        </div>
      )}
      {userMenuClicked && <UserMenu userMenuClicked={userMenuClicked} />}
    </div>
  );
};

export default HeaderUser;
