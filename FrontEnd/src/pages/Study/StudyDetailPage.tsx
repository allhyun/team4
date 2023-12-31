import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudyDeleteModify from "../../components/Study/StudyDeleteModify";

const StudyDetailPage = () => {
  const { st_idx } = useParams();
  const [study, setStudy] = useState<Study | null>(null);
  interface Study {
    st_title: string;
    st_intro: string;
    // ... 다른 속성들도 쓸때 추가
  }

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/study/detail/${st_idx}`
        );
        setStudy(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // useEffect 내에서만 요청
    fetchStudyDetail();
  }, [st_idx]); // st_idx가 변경될 때마다 useEffect 재실행

  return (
    <>
      {study ? (
        <>
          <h3>{study.st_title}</h3>
          <div>내용:{study.st_intro}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <StudyDeleteModify st_idx={parseInt(`${st_idx}`, 10)} />
    </>
  );
};

export default StudyDetailPage;
