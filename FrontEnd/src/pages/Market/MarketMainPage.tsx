import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import MarketHeader from '../../components/Market/MarketHeader';
import MarketThumbnailPost from '../../components/Market/MarketThumbnailPost';
import '../../styles/style.scss';

export default function MarketMainPage() {
  // onSearch 함수의 구현
  const onSearch = (searchTerm: string) => {
    console.log(searchTerm); // 검색 처리 로직
  };
  // 페이지네이션
  const [page, setPage] = useState<number>(1);
  const [Apage, setApage] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // const res = await axios.get('http://localhost:8000/product');
        // 배포용
        const res = await axios.get(`${process.env.REACT_APP_HOST}/product`);
        //전체 페이지 갯수
        console.log(res.data.totalCount);
        setApage(Math.ceil((res.data.totalCount + 1) / 6));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <MarketHeader />
      <div>
        <div className="market-main-container">
          <MarketThumbnailPost page={page} />
        </div>
        <div className="market-main-page-container">
          <Pagination
            count={Apage}
            size="large"
            onChange={handleChange}
            page={page}
          />
          {/* 전체 데이터 개수+1를 가져와서 6으로 나눠서 몫+1  만큼을 count props에 넣기 */}
        </div>
      </div>
    </>
  );
}
