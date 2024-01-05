import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';

// 서버에서 넘어오는 데이터 타입
interface DataType {
  ud_idx: number;
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
interface propsType {
  page: number;
}

const MarketThumbnailPost = (props: propsType) => {
  const data = props.page;
  const navigate = useNavigate();
  const [postList, setPostList] = useState<DataType[]>([]);

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

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://localhost:8000/product', {
          params: { page: data },
        });

        console.log('서버 응답:', res.data); // 서버로부터 받은 전체 응답 확인
        if (res.data.usedgoods) {
          setPostList(res.data.usedgoods);
          //console.log('postList 상태 업데이트 후:', res.data.usedgoods); // postList에 저장될 데이터 확인
        } else {
          //   console.log('서버 응답에 usedgoods 없음');
        }
      } catch (error) {
        console.error('게시글 로딩 에러:', error);
      }
    }

    fetchPosts();
  }, [props.page]); // useEffect를 이용해 컴포넌트가 마운트될 때 데이터를 불러옴

  // 상세 페이지 이동
  function goDetailPage(index: string): void {
    navigate(`/product/detail/${index}`);
  }

  // 상품명 글자수 제한
  const truncateTitle = (title: string, maxLength: number): string => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '…';
    }
    return title;
  };

  return (
    <div id="market-main-container" className="market-main-container">
      <div id="market-main-box" className="market-main-box">
        {postList &&
          postList.map((data) => (
            <div
              key={data.u_idx}
              className="thum"
              onClick={() => goDetailPage(`${data.ud_idx}`)}
            >
              <div className="img-container">
                <img
                  src={`http://localhost:8000/static/userImg/${data.ud_image}`}
                  alt={`preview-${data.ud_idx}`}
                />
              </div>
              <p className="title">{truncateTitle(data.ud_title, 14)}</p>
              <p className="price">{formatPrice(data.ud_price)} 원</p>
              <div className="redgion-date-container">
                <p>{data.ud_region}</p>
                <p>{timeSince(data.ud_date)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MarketThumbnailPost;
