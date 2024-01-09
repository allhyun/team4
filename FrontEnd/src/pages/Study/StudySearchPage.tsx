import { useSelector } from 'react-redux';
import StudyHeader from '../../components/Study/StudyHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudySearchPage = () => {
  const navigate = useNavigate();
  const searchData = useSelector(
    (state: any) => state.search.search.searchDetail
  ); //리덕스에서 검색어 가져오기(여유되면 타입 고치기)
  const [searchList, setSearchList] = useState<StudyTable[]>([]);
  interface StudyTable {
    st_be: number;
    st_date: string;
    st_fe: number;
    st_full: any;
    st_idx: number;
    st_intro: string;
    st_limit: number;
    st_now_mem: number;
    st_pub: number;
    st_title: string;
    u_idx: number;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        // const res = await axios.get('http://localhost:8000/study/search'
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}/study/search`,
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
  }, [searchData]); // useEffect를 이용해 컴포넌트가 마운트될 때 데이터를 불러옴
  function goDetailPage(index: string): void {
    navigate(`/study/detail/${index}`);
  }

  return (
    <>
      <StudyHeader />
      <div className="center">
        <div className="st-main-container">
          {' '}
          {searchList.reverse().map((study) => (
            <div
              key={study.st_idx}
              className="thum"
              onClick={() => goDetailPage(`${study.st_idx}`)}
            >
              <h3>{study.st_title}</h3>
              <p>{study.st_limit}개월</p>
              <p>{study.st_intro}</p>
              <p>
                p:{study.st_pub}
                F:{study.st_fe}
                B:{study.st_be}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudySearchPage;
