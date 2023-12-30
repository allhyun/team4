//검색기능, 섬네일들,
//css
import '../../styles/study_main.scss';
import StudyCreateBox from '../../components/Study/StudyCreateBox';

import StudyThumbnailBox from '../../components/Study/StudyThumbnailBox';
import StudySearch from '../../components/Study/StudySearch';

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
