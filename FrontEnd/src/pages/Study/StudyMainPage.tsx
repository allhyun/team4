//검색기능, 섬네일들,
//css
import "../../styles/study_main.scss";
import StudyCreateBox from "../../components/Study/StudyCreateBox";

import StudyThumbnailBox from "../../components/Study/StudyThumbnailBox";
import StudySearch from "../../components/Study/StudySearch";
import StudyHeader from "../../components/Study/StudyHeader";

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
