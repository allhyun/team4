//포지션별로 몇명구하고있는지
//누르면 상세페이지로 이동
//여기서 데이터를 받아온다음에 mab사용해서 정보 표시

//비동기처리해야하는지 알아보기
import axios from 'axios';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [studyList, setStudyList] = useState<StudyTable[]>([]);

  const key = location.state?.key;

  async function fetchData() {
    try {
      // const res = await axios.get('http://localhost:8000/study'
      const res = await axios.get(`${process.env.REACT_APP_HOST}/study`, {
        params: { page: data },
      });
      setStudyList(res.data.resultstudy);
    } catch (error) {
      console.log(error);
    }
  }
  //작성페이지에서 넘어왔을때 렌터링
  if (key === 'study-page') {
    fetchData();
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
          <h3>{study.st_title}</h3>
          <p>{study.st_limit}개월</p>

          <p>
            p:{study.st_pub}
            F:{study.st_fe}
            B:{study.st_be}
          </p>
        </div>
      ))}
    </>
  );
};

export default StudyThumbnailBox;
