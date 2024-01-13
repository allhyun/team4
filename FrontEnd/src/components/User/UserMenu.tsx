import React, { MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { removeUserInfo } from '../../store/user.slice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IoHeartSharp, IoPerson, IoLogOutOutline } from 'react-icons/io5';
import useOnClickOutside from '../../Hooks/useOnClickOutside';

const UserMenu = ({ setIsModalOpen }: any) => {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useOnClickOutside(ref, () => setIsModalOpen(false));

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
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="user-menu" ref={ref}>
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
