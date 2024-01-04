import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.scss';

// 데이터 타입
interface DataType {
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_category: string; // 카테고리
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
}

const MarketThumbnailPost = () => {
  const [posts, setPosts] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const response = await axios.get(
          `${process.env.REACT_APP_HOST}/product/regist`
          // 'http://localhost:8000/product/regist'
        );

        setPosts(response.data);
      } catch (error) {
        console.error('게시글 로딩 에러:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div id="marketcontainer" className="market_container">
      {posts.map((post) => (
        <div key={post.u_idx}>
          <img
            src={post.ud_image ? post.ud_image : '../../public/img/jordy.gif'}
            alt={`preview-${post.u_idx}`}
          />
          <h3>{post.ud_title}</h3>
          <p>{post.ud_price}</p>
          <p>{post.ud_region}</p>
          <p>{post.ud_date}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketThumbnailPost;
