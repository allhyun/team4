import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//리덕스 관련
import { setMarketDetail } from '../../store/marketmodifyReducer';
import { useDispatch } from 'react-redux';
//
import '../../styles/style.scss';
import { IoEyeSharp } from 'react-icons/io5'; // 조회수 아이콘
import { PiHeartFill } from 'react-icons/pi'; // 좋아요 아이콘
import { MdOutlineAccessTimeFilled } from 'react-icons/md'; // 시간 아이콘

interface DetailDataType {
  ud_idx: number; // 게시판 포린키
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_category: number | null; // 카테고리
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
  nickname: string; // 사용자 닉네임
}
// // 카테고리 문자 변환 함수 타입 정의
// interface CategoryMap {
//   [key: string]: string;
// }

// // 카테고리 숫자 ID를 문자열로 매핑
// const getCategoryID = (categoryName: string): number | null => {
//   const categoryMap: CategoryMap = {
//     1: '도서',
//     2: '전자기기',
//     3: '문구',
//     4: '티켓/쿠폰',
//     5: '생활',
//     6: '취미',
//     7: '무료나눔',
//     8: '기타',
//   };
//   // 카테고리 이름이 없으면 null 반환
//   return categoryMap[categoryName] || null;
// };

const MarketDetailPage = () => {
  const { ud_idx } = useParams();
  const [marketDetail, setMarketDetail] = useState<DetailDataType | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/detail/${ud_idx}`)
      .then((response) => {
        console.log('서버 응답 데이터:', response.data);
        setMarketDetail(response.data);
      })
      .catch((error) => console.error(error));
  }, [ud_idx]);

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!marketDetail) {
    return <div>Loading...</div>;
  }

  // 날짜 변환 함수
  const timeSince = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const timeDiff = now.getTime() - postDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  return (
    <>
      <MarketHeader />
      <div id="detail-categoty">{marketDetail.ud_category}</div>
      <div id="market-detail-container" className="market-detail-container">
        <div id="market-detail-box" className="market-detail-box">
          <div className="img-container">
            <img
              src={`http://localhost:8000/static/userImg/${marketDetail.ud_image}`}
              alt={`preview-${marketDetail.ud_idx}`}
            />
          </div>
          <h1>{marketDetail.ud_category}</h1>
          <h1>{marketDetail.ud_title}</h1>
          <h1>{formatPrice(marketDetail.ud_price)} 원</h1>
          <h1>거래지역 {marketDetail.ud_region}</h1>
          <h1>판매자 {marketDetail.u_idx}</h1>
          <h1>상품 정보 {marketDetail.ud_content}</h1>
          <p>
            <IoEyeSharp />
            {''} {''}
            {marketDetail.viewcount}
          </p>
          <p>
            <MdOutlineAccessTimeFilled /> {''} {''}
            {timeSince(marketDetail.ud_date)}
          </p>
          <p>
            <PiHeartFill />
          </p>
        </div>
      </div>
    </>
  );
};

export default MarketDetailPage;
