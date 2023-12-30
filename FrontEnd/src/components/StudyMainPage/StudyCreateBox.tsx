//스터디를 작성하는 페이지로 리다이렉트해주는 요소
import { Link } from 'react-router-dom';
import '../../styles/study_main.scss';
const StudyCreateBox = () => {
  return (
    <>
      <Link to="/study/edit">
        <div>스터디 생성</div>
      </Link>
    </>
  );
};

export default StudyCreateBox;
