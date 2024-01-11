import { useSelector } from 'react-redux';
import StudyHeader from '../../components/Study/StudyHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';

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
  return (
    <>
      <StudyHeader />
      <div className="st-main-container">
        {searchList.map((study) => (
          <div
            key={study.st_idx}
            className="thum"
            onClick={() => goDetailPage(`${study.st_idx}`)}
          >
            <div className="thum-TMP">
              <div className="column">
                <div className="thum-titleP">{study.st_title}</div>
                <div className="thum-clock">
                  <MdOutlineAccessTimeFilled /> {timeSince(study.st_date)}
                </div>
              </div>

              <p className="thum-month">{study.st_limit}주</p>
            </div>
            <div>
              {' '}
              <hr />
            </div>

            <div>
              <div>퍼블리셔:{study.st_pub}</div>
              <div>프론트엔드:{study.st_fe}</div>
              <div>백엔드:{study.st_be}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudySearchPage;
