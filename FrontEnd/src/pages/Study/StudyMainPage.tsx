//검색기능, 섬네일들,
//css
import StudyCreateBox from '../../components/Study/StudyCreateBox';
import StudyThumbnailBox from '../../components/Study/StudyThumbnailBox';
import StudyHeader from '../../components/Study/StudyHeader';
import '../../styles/style.scss';

const StudyMainPage = () => {
  return (
    <>
      <StudyHeader />
      <div className="st-main-container">
        <StudyCreateBox />
        <StudyThumbnailBox />
      </div>
    </>
  );
};

export default StudyMainPage;
