//검색기능, 섬네일들,
//css
import '../../styles/study_main.scss';

import StudyThumbnailBox from '../../components/StudyMainPage/StudyThumbnailBox';

const StudyMainPage = () => {
  //검색창에서 검색한정보를 서버로보내기
  return (
    <>
      <input type="text" placeholder="여기는 검색창입니다" />
      <button>검색</button>
      <StudyThumbnailBox />
    </>
  );
};

export default StudyMainPage;
