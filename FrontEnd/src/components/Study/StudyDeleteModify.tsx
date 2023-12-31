import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  st_idx: number;
}

const StudyDeleteModify = (props: PropsType) => {
  const navigate = useNavigate();
  const pageNumber: number = props.st_idx;

  const modifyStudy = async () => {
    navigate('/study/modify');
  };
  const deleteStudy = async () => {
    try {
      // await axios.delete(`http://localhost:8000/study/delete/${pageNumber}`);
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
      {/* 로그인 되어있고 작성자와 키값이 같을경우 */}
      {/* 작성자와 로그인 한 유저 비교하는 기능 추가해야함 */}
      <button onClick={modifyStudy} className="study-button">
        수정
      </button>
      <button onClick={deleteStudy} className="study-button">
        삭제
      </button>
      {/* 로그인되어있지만 다를경우 */}
      <button onClick={joinStudy} className="study-button">
        참여(문의)
      </button>
    </>
  );
};

export default StudyDeleteModify;
