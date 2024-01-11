import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setModifyPost } from '../../store/marketmodifyReducer';
import { DataType, propsType } from '../Types/MarketType';
import Heart from './Heart';

interface marketTable {
  ud_idx: number;
  u_idx: number;
  buy_idx: number;
  ud_price: number;
  ud_title: string;
  ud_image: string;
  ud_content: string;
  ud_region: string;
  viewcount: number;
  ud_date: string;
  c_idx: number;
}

const UserHeartPost = (props: propsType) => {
  const dispatch = useDispatch();
  const data = props.page;
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [postList, setPostList] = useState<DataType[]>([]);
  const u_idx = useSelector((state: any) => state.user.user.u_idx);

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

  // async function fetchData() {
  //   try {
  //     // const res = await axios.get('http://localhost:8000/study'
  //     const res = await axios.get(`${process.env.REACT_APP_HOST}/product`, {
  //       params: { page: data },
  //     });
  //     setPostList(res.data.resultstudy);
  //     setDataLoaded(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('u_idx', u_idx);
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}/user/heart`,
          {
            params: { u_idx: u_idx },
          }
        );
        console.log('res.data', res.data);

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
  }, []);

  return (
    <div id="market-main-container" className="market-main-container">
      <div id="market-main-box" className="market-main-box">
        {postList &&
          postList.map((data) => (
            <div key={data.u_idx} className="thum">
              <div onClick={() => goDetailPage(`${data.ud_idx}`)}>
                <div className="img-container">
                  {data.ud_image && data.ud_image.length > 0 && (
                    <img
                      // src={`http://localhost:8000/static/userImg/${data.ud_image[0]}`}
                      src={`${process.env.REACT_APP_HOST}/static/userImg/${data.ud_image[0]}`}
                      alt={`preview-${data.ud_idx}`}
                    />
                  )}
                </div>
                <p className="title">{truncateTitle(data.ud_title, 14)}</p>
                <p className="price">{formatPrice(data.ud_price)} 원</p>
              </div>
              <Heart />
              {/* <div className="region-date-container region-date-wrap">
                <p>{data.ud_region}</p>
                <p>{timeSince(data.ud_date)}</p>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserHeartPost;
