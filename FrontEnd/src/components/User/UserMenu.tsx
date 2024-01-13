import React, { MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { removeUserInfo } from '../../store/user.slice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IoHeartSharp, IoPerson, IoLogOutOutline } from 'react-icons/io5';
import useOnClickOutside from '../../Hooks/useOnClickOutside';

const UserMenu = ({ setIsModalOpen, useRef }: any) => {
  useOnClickOutside(useRef, () => setIsModalOpen(false));

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUserInfo());

    axios
      .get(`${process.env.REACT_APP_HOST}/user/logout`, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="user-menu">
        <Link to="/heart">
          <IoHeartSharp />
          관심 목록
        </Link>
        <Link to="/user">
          <IoPerson />
          마이페이지
        </Link>
        <Link to="/" onClick={logoutHandler}>
          <IoLogOutOutline />
          로그아웃
        </Link>
      </div>
    </>
  );
};

export default UserMenu;
