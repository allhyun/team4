import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import MarketHeader from '../../components/Market/MarketHeader';
import MarketThumbnailPost from '../../components/Market/MarketThumbnailPost';
import '../../styles/style.scss';

export default function MarketMainPage() {
  // 페이지네이션
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/product`, {
          params: { page: page },
        });
        console.log(res.data.totalCount);
        setTotalPages(Math.ceil(res.data.totalCount / 8)); // 페이지 수 계산 수정
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [page]);

  return (
    <>
      <MarketHeader />
      <div>
        <div className="market-main-container">
          <MarketThumbnailPost page={page} />
        </div>
        <div className="market-main-page-container">
          <Pagination
            count={totalPages}
            size="large"
            onChange={handleChange}
            page={page}
          />
        </div>
      </div>
    </>
  );
}
