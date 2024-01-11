//포지션별로 몇명구하고있는지
//누르면 상세페이지로 이동
//여기서 데이터를 받아온다음에 mab사용해서 정보 표시

//비동기처리해야하는지 알아보기
import axios from 'axios';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';

//서버에서 넘어오는 데이터 타입
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
interface propsType {
  page: number;
}

const StudyThumbnailBox = (props: propsType) => {
  const data = props.page;
  const navigate = useNavigate();
  const location = useLocation();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [studyList, setStudyList] = useState<StudyTable[]>([]);
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

  async function fetchData() {
    try {
      // const res = await axios.get('http://localhost:8000/study'
      const res = await axios.get(`${process.env.REACT_APP_HOST}/study`, {
        params: { page: data },
      });
      setStudyList(res.data.resultstudy);
      setDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props, location.pathname]); //props가 변할때,
  useEffect(() => {
    fetchData();
  }, []);

  function goDetailPage(index: string): void {
    navigate(`/study/detail/${index}`);
  }
  return (
    <>
      {studyList.map((study) => (
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
    </>
  );
};

export default StudyThumbnailBox;
