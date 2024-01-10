import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import UserHeartPost from '../../components/User/UserHeartPost';

import '../../styles/style.scss';

export default function UserHeartListPage() {
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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(`${process.env.APP_REACT_HOST}/user/heart`);

  //       // console.log(res.data.totalCount);
  //       setApage(Math.ceil((res.data.totalCount + 1) / 6));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <div className="market-main-container">
          <UserHeartPost page={page} />
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
