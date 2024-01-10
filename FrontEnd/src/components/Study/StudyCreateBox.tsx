//스터디를 작성하는 페이지로 리다이렉트해주는 요소
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudyCreateBox = () => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <>
      {user ? (
        <>
          <Link to="/study/edit" className="thumMK">
            <div className="thum-CPlus">
              <div className="thum-circle">
                <div className="thum-plus">+</div>
              </div>

              <div>스터디 구하기 </div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="thumMK">
            <div className="thum-CPlus">
              <div className="thum-circle">
                <div className="thum-plus">+</div>
              </div>

              <div>스터디 구하기 </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default StudyCreateBox;
