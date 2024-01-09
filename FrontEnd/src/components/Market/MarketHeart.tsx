import axios from 'axios';
import React, { useState } from 'react';
import { PiHeartFill } from 'react-icons/pi'; // 찜 아이콘
import { Heart, MarketHeartProps } from '../Types/MarketType';

const MarketHeart: React.FC<MarketHeartProps> = ({ user, product }) => {
  const [heartButtonClicked, setHeartButtonClicked] = useState(false);

  const [data, setData] = useState<Heart>({
    ud_idx: 1,
    u_idx: null,
    h_idx: null,
  });

  const handleHeartClick = async () => {
    // 실제 API 경로로 대체
    const postApiUrl = `${process.env.REACT_APP_HOST}/product/heart`;
    const deleteApiUrl = `${process.env.REACT_APP_HOST}/product/?u_idx=${data.u_idx}&ud_idx=${data.ud_idx}`;

    try {
      if (heartButtonClicked) {
        // 이미 찜한 상태이면 삭제 요청
        await axios.delete(deleteApiUrl);
      } else {
        // 찜하지 않은 상태이면 추가 요청
        await axios.post(postApiUrl, {
          u_idx: data.u_idx,
          ud_idx: data.ud_idx,
        });
      }
      setHeartButtonClicked(!heartButtonClicked);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <button className="detailbutton heart" onClick={handleHeartClick}>
      <PiHeartFill color={heartButtonClicked ? '#fcbaba' : '#ffffffd9'} />
      {'\u00A0'}
      {'\u00A0'}찜
    </button>
  );
};

export default MarketHeart;
