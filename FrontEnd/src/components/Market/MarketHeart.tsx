import axios from 'axios';
import React, { useState } from 'react';
import { PiHeartFill } from 'react-icons/pi'; // 찜 아이콘
import { MarketHeartProps } from '../Types/MarketType';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MarketHeart: React.FC<MarketHeartProps> = () => {
  const [heartButtonClicked, setHeartButtonClicked] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const modifyPost = useSelector(
    (state: any) => state.market.market.modifyPost
  );

  const handleHeartClick = async () => {
    try {
      if (heartButtonClicked) {
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

      setHeartButtonClicked(!heartButtonClicked);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  // 마운트되면 유저 정보 요청해서 가져오기
  // const getUserInfo = async () => {
  //   const res: any = await axios.post(
  //     `${process.env.REACT_APP_HOST}/product/detail/${ud_idx}`,
  //     data,
  //     { withCredentials: true }
  //   );
  //   await console.log('res:', res);
  //   if (res != null) {
  //     setUserInfo(res.data.user);
  //   }
  // };

  return (
    <button className="detailbutton heart" onClick={handleHeartClick}>
      <PiHeartFill color={heartButtonClicked ? '#fcbaba' : '#ffffffd9'} />
      {'\u00A0'}
      {'\u00A0'}찜
    </button>
  );
};

export default MarketHeart;
