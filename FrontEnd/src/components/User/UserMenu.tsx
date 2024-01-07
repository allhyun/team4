import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  userMenuClicked: boolean;
};

const UserMenu = ({ userMenuClicked }: Props) => {
  return ReactDOM.createPortal(
    <>
      {userMenuClicked && (
        <div className="user-menu">
          <Link to="/">관심 목록</Link>
          <Link to="/">마이페이지</Link>
          <Link to="/">로그아웃</Link>
        </div>
      )}
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default UserMenu;
