//검색기능, 섬네일들,
//css
import StudyCreateBox from '../../components/Study/StudyCreateBox';
import StudyThumbnailBox from '../../components/Study/StudyThumbnailBox';
import StudyHeader from '../../components/Study/StudyHeader';
import { Pagination } from '@mui/material';
import '../../styles/style.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { number } from 'yargs';
const StudyMainPage = () => {
  const [page, setPage] = useState<number>(1);
  const [Apage, setApage] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }
  //axios요청으로 전체페이지개수,

  useEffect(() => {
    async function fetchData() {
      try {
        // const res = await axios.get('http://localhost:8000/study');
        // 배포용
        const res = await axios.get(`${process.env.REACT_APP_HOST}/study`);
        //전체 페이지 갯수

        setApage(Math.ceil((res.data.totalCount + 1) / 6));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <StudyHeader />
      <div className="test11">
        <div className="st-main-container">
          {page === 1 && <StudyCreateBox />}
          <StudyThumbnailBox page={page} />
        </div>
        <div className="st-main-page-container">
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
};
// 페이지네이션 api구현
// 1.페이지 갯수 정하기((1).프론트로 전체 페이지를 변수에 담아서 보내주세요)
// 2.페이지를 선택하거나 다음 방향표를 눌러서 페이지에 해당하는 api요청(curror값넘겨주고,6개씩 보여주기)
//(2).--cursor값을 받으면 최근데이터 cursor*6이후의 데이터 6개 불러오는 백엔드 코드

export default StudyMainPage;
