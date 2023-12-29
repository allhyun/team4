//검색기능, 섬네일들,
//css
import '../../styles/study_main.scss';
import StudyCreateBox from '../../components/StudyMainPage/StudyCreateBox';

import StudyThumbnailBox from '../../components/StudyMainPage/StudyThumbnailBox';
import StudySearch from '../../components/StudyMainPage/StudySearch';

const StudyMainPage = () => {
  return (
    <>
      <StudySearch />
      <StudyCreateBox />
      <StudyThumbnailBox />
    </>
  );
};

export default StudyMainPage;
