import React, { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';

const Heart = () => {
  const [changeHeart, setChangeHeart] = useState<boolean>(true);
  // const [heartButtonClicked, setHeartButtonClicked] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const modifyPost = useSelector(
    (state: any) => state.market.market.modifyPost
  );

  const handleHeartClick = async () => {
    try {
      console.log('handleHeartClick 작동');
      if (changeHeart) {
        // 이미 찜한 상태이면 삭제 요청
        await axios.delete(
          `${process.env.REACT_APP_HOST}/product/heart?u_idx=${userInfo.u_idx}&ud_idx=${modifyPost.ud_idx}`
        );
      } else {
        // 찜하지 않은 상태이면 추가 요청
        await axios.post(`${process.env.REACT_APP_HOST}/product/heart`, {
          u_idx: userInfo.u_idx,
          ud_idx: modifyPost?.ud_idx,
        });
      }

      // setHeartButtonClicked(!heartButtonClicked);
      setChangeHeart(!changeHeart);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  // const heartHandler = () => {};

  return (
    <div className="heart" onClick={handleHeartClick}>
      {changeHeart ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default Heart;
