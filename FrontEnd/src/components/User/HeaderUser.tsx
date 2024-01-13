import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const HeaderUser = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 로그인 로그아웃에 따른 상태 변화
  const loginUser: any = useSelector((state: any) => state.user.user);

  useEffect(() => {}, []);

  const userMenuHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="user-menu-wrap">
      {loginUser.u_idx === null ? (
        <Link to="/login">로그인</Link>
      ) : (
        <div className="logined-user" onClick={userMenuHandler}>
          <div>{`${loginUser.nickname}`}</div>
          <img
            src={`${process.env.REACT_APP_HOST}/${loginUser.u_img}`}
            alt="유저 프로필 이미지"
          />
        </div>
      )}
      {isModalOpen && loginUser.u_idx !== null && (
        <UserMenu setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default HeaderUser;
