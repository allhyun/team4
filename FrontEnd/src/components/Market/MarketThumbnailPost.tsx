import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModifyPost } from '../../store/marketmodifyReducer';
import { DataType, propsType } from '../Types/MarketType';

const MarketThumbnailPost = (props: propsType) => {
  const dispatch = useDispatch();
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

  // 상품명 글자수 제한
  const truncateTitle = (title: string, maxLength: number): string => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '…';
    }
    return title;
  };

  // 상세 페이지 이동
  function goDetailPage(ud_idx: string): void {
    const post = postList.find((post) => post.ud_idx === Number(ud_idx));
    if (post) {
      dispatch(setModifyPost(post));
      navigate(`/product/detail/${ud_idx}`);
    }
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://localhost:8000/product', {
          // 배포 axios
          // `${process.env.REACT_APP_HOST}/product/`,
          params: { page: data },
        });

        if (res.data.usedgoods) {
          const modifiedData = res.data.usedgoods.map((item: DataType) => {
            // 여기서 item은 DataType 타입이다!
            if (typeof item.ud_image === 'string') {
              try {
                item.ud_image = JSON.parse(item.ud_image);
              } catch (error) {
                console.error('JSON 파싱 에러:', error);
                item.ud_image = null;
              }
            }
            return item;
          });

          setPostList(modifiedData);
        }
      } catch (error) {
        console.error('게시글 로딩 에러:', error);
      }
    }

    fetchPosts();
  }, [props.page]);

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
                {data.ud_image && data.ud_image.length > 0 && (
                  <img
                    src={`http://localhost:8000/static/userImg/${data.ud_image[0]}`}
                    alt={`preview-${data.ud_idx}`}
                  />
                )}
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
