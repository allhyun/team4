import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserMyPage = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  const u_idx = useSelector((state: any) => state.user.user.u_idx);
  const data: any = { u_idx };

  const getUserInfo = async () => {
    const response: any = await axios.post(
      'http://localhost:8000/user/mypage',
      data
    );
    if (response !== null) {
      setUserInfo(response.data.user);
    }
  };

  useEffect(() => {
    console.log('userInfo', userInfo);
    // const usertrue = Object.keys(userInfo).includes('nickname');
    // console.log('usertrue', usertrue);
  }, [userInfo]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return <>{userInfo && <div>{userInfo.nickname}님 환영합니다.</div>}</>;
};

export default UserMyPage;
