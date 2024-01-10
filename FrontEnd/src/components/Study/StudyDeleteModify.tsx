import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
interface PropsType {
  st_idx: number;
}

const StudyDeleteModify = (props: PropsType) => {
  const userData = useSelector((state: any) => state.user.user);
  const studyData = useSelector((state: any) => state.study.study.studyDetail);
  const navigate = useNavigate();
  const pageNumber: number = props.st_idx;

  const modifyStudy = async () => {
    navigate('/study/modify');
  };
  const deleteStudy = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_HOST}/study/delete/${pageNumber}`
      );

      navigate('/study');
    } catch (error) {
      console.error(error);
    }
  };

  const joinStudy = async () => {
    navigate('/chatting', { state: { key: 'study-page' } });
  };

  return (
    <>
      <div className="studyD-buttons">
        {studyData && userData.u_idx === studyData.u_idx && (
          <>
            <button onClick={modifyStudy} className="study-button">
              수정
            </button>
            <button onClick={deleteStudy} className="study-button">
              삭제
            </button>
          </>
        )}

        {/* 로그인되어있지만 다를경우 */}
        <button onClick={joinStudy} className="study-button">
          채팅
        </button>
      </div>
    </>
  );
};

export default StudyDeleteModify;
