import axios from 'axios';
import React, { useState } from 'react';
import { PiHeartFill } from 'react-icons/pi'; // 찜 아이콘
import { Heart, MarketHeartProps } from '../Types/MarketType';
import { Console } from 'console';
import { setUserInfo } from '../../store/user.slice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MarketHeart: React.FC<MarketHeartProps> = ({ user, product }) => {
  const { ud_idx } = useParams();
  const [heartButtonClicked, setHeartButtonClicked] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const { u_idx, nickname } = userInfo;
  console.log('서버에 보내는 값:', userInfo); // 여기에 콘솔 로그 추가
  const modifyPost = useSelector(
    (state: any) => state.market.market.modifyPost
  );

  const [data, setData] = useState<Heart>({
    ud_idx: 1,
    u_idx: Number(u_idx) || null,
    h_idx: 1,
  });

  const handleHeartClick = async () => {
    // 실제 API 경로로 대체
    const postApiUrl = `${process.env.REACT_APP_HOST}/product/heart`;
    const deleteApiUrl = `${process.env.REACT_APP_HOST}/product/heart?ud_idx=${product}&u_idx=${user}`;

    try {
      if (heartButtonClicked) {
        // 이미 찜한 상태이면 삭제 요청
        await axios.delete(deleteApiUrl);
      } else {
        // 찜하지 않은 상태이면 추가 요청
        await axios.post(postApiUrl, {
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
