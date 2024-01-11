import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudyDeleteModify from '../../components/Study/StudyDeleteModify';
//리덕스 관련
import { setStudyDetail } from '../../store/modifyReducer';
import { setchatDetail } from '../../store/chatReducer';
import { useDispatch } from 'react-redux';
//
import '../../styles/style.scss';
import StudyHeader from '../../components/Study/StudyHeader';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';

const StudyDetailPage = () => {
  const { st_idx } = useParams();
  const [study, setStudy] = useState<Study | null>(null);
  interface Study {
    st_title: string;
    st_intro: string;
    st_be: number;
    st_pub: number;
    st_fe: number;
    st_limit: number;
    st_date: string;
    // ... 다른 속성들도 쓸때 추가
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        // const res = await axios.get(
        //   `http://localhost:8000/study/detail/${st_idx}`
        // );
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}/study/detail/${st_idx}`
        );
        setStudy(res.data);
        dispatch(setStudyDetail(res.data));
        dispatch(setchatDetail(res.data));
        //리덕스에 상세페이지 api를 실행했을때 가져온 정보 저장
      } catch (error) {
        console.error(error);
      }
    };

    // useEffect 내에서만 요청
    fetchStudyDetail();
  }, [dispatch, st_idx]); // st_idx가 변경될 때마다 useEffect 재실행
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
      <div className="study-detail-container">
        {study ? (
          <>
            <div className="detail-title-box">
              <div>
                <div className="detail-titleP">{study.st_title}</div>
                <div className="detail-time">
                  <MdOutlineAccessTimeFilled /> {timeSince(study.st_date)}
                </div>
              </div>

              <div className="detail-month">{study.st_limit} 주</div>
            </div>
            <div>퍼블리셔: {study.st_pub}</div>
            <div>프론트엔드: {study.st_fe}</div>
            <div>백엔드: {study.st_be}</div>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: study.st_intro }}
              className="html-con"
            />
          </>
        ) : (
          <></>
        )}
        <StudyDeleteModify st_idx={parseInt(`${st_idx}`, 10)} />
      </div>
    </>
  );
};

export default StudyDetailPage;
