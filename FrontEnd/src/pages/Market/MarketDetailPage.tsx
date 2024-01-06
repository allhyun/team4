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

const MarketDetailPage = () => {
  const { ud_idx } = useParams();
  console.log('ud_idx:', ud_idx); // ud_idx 값 로그 출력
  const [market, setMarket] = useState<DataType | null>(null);

  interface DataType {
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
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMarketDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/detail/${ud_idx}`
        );
        console.log('API 응답:', res.data); // API 응답 로그 추가
        setMarket(res.data);
        dispatch(setMarketDetail(res.data));
        //리덕스에 상세페이지 api를 실행했을때 가져온 정보 저장
      } catch (error) {
        console.error(error);
      }
    };

    // useEffect 내에서만 요청
    fetchMarketDetail();
  }, [dispatch, ud_idx]); // ud_idx가 변경될 때마다 useEffect 재실행

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <MarketHeader />
      <div id="market-detail-container" className="market-detail-container">
        {market ? (
          <>
            <div key={market.u_idx} className="thum">
              <div className="img-container">
                <img
                  src={`http://localhost:8000/static/userImg/${market.ud_image}`}
                  alt={`preview-${market.ud_idx}`}
                />
              </div>
              <p className="title">{market.ud_title}</p>
              <p className="price">{formatPrice(market.ud_price)} 원</p>
              <div className="redgion-date-container">
                <p>{market.ud_region}</p>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default MarketDetailPage;
