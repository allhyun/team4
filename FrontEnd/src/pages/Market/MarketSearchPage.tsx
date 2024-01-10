import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DetailDataType2 } from '../../components/Types/MarketType';
import MarketHeader from '../../components/Market/MarketHeader';
import { setMarketSearchDetail } from '../../store/marketSearchReducer';
import '../../styles/style.scss';

const MarketSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string | number>(''); // 검색어 상태(재검색)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector(
    (state: any) => state.marketSearch.marketSearch.marketSearchDetail
  );
  const [searchList, setSearchList] = useState<DetailDataType2[]>([]);

  // 검색어가 변경될 때 실행되는 함수
  const handleSearchTermChange = (newTerm: string | number) => {
    setSearchTerm(newTerm);
  };

  // 상품명 글자수 제한
  const truncateTitle = (title: string, maxLength: number): string => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '…';
    }
    return title;
  };

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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

  useEffect(() => {
    async function fetchData() {
      try {
        // const res = await axios.get('http://localhost:8000/study/search'
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}/product/search`,
          {
            params: { value: searchData },
          }
        );
        setSearchList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchData) {
      fetchData();
    }
  }, [searchData]);

  // 상세 페이지 이동
  // function goDetailPage(ud_idx: string): void {
  //   const post = searchList.find((post) => post.ud_idx === Number(ud_idx));
  //   if (post) {
  //     dispatch(setMarketSearchDetail(post));
  //     navigate(`/product/detail/${ud_idx}`);
  //   }
  // }

  function goDetailPage(ud_idx: string): void {
    navigate(`/product/detail/${ud_idx}`);
  }

  return (
    <div>
      <MarketHeader />
      <div className="center">
        <div id="market-main-container" className="market-main-container">
          <div id="market-main-box" className="market-main-box">
            {searchList &&
              searchList.map((data) => (
                <div
                  key={data.u_idx}
                  className="thum"
                  onClick={() => goDetailPage(`${data.ud_idx}`)}
                >
                  <div className="img-container">
                    {data.ud_image && data.ud_image.length > 0 && (
                      <img
                        src={`${process.env.REACT_APP_HOST}/static/userImg/${data.ud_image[0]}`}
                        alt={`preview-${data.ud_idx}`}
                      />
                    )}
                  </div>
                  <p className="title">{truncateTitle(data.ud_title, 14)}</p>
                  <p className="price">{formatPrice(data.ud_price)} 원</p>
                  <div className="region-date-container">
                    <p>{data.ud_region}</p>
                    <p>{timeSince(data.ud_date)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSearchPage;
