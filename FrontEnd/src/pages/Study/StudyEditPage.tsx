import StudyHeader from '../../components/Study/StudyHeader';
import StudyToastEditor from '../../components/Study/StudyToastEditor';
import '../../styles/style.scss';
const StudyEditPage = () => {
  return (
    <>
      <StudyHeader />
      <div className="study-edit-ouline">
        <StudyToastEditor />
      </div>
    </>
  );
};

export default StudyEditPage;
