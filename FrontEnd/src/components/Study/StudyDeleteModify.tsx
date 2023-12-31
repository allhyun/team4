import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PropsType {
  st_idx: number;
}

const StudyDeleteModify = (props: PropsType) => {
  const navigate = useNavigate();
  const pageNumber: number = props.st_idx;

  const deleteStudy = async () => {
    try {
      await axios.delete(`http://localhost:8000/study/delete/${pageNumber}`);
      navigate("/study");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button>수정</button>
      {/* 작성자와 로그인 한 유저 비교하는 기능 추가해야함 */}
      <button onClick={deleteStudy}>삭제</button>
    </>
  );
};

export default StudyDeleteModify;
