// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Link, useLocation } from 'react-router-dom';

// const UserMenu = () => {
//   const [userMenuClicked, setUserMenuClicked] = useState(false);

//   // 로그인 로그아웃에 따른 상태 변화
//   const loginUser: any = useSelector((state: any) => state.user.user);
//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     setUserMenuClicked(false);
//     dispatch(removeUserInfo());
//     // 다른 리덕스 상태들도 삭제하는 dispatch도 추가해야 함
//     axios
//       .get('http://localhost:8000/user/logout', {
//         withCredentials: true,
//       })
//       .then((res) => console.log(res));
//   };

//   const userMenuHandler = () => {
//     setUserMenuClicked(!userMenuClicked);
//     console.log('click');
//   };

//   return ReactDOM.createPortal(
//     <div className="user-menu">
//       <Link to="/">관심 목록</Link>
//       <Link to="/">마이페이지</Link>
//       <Link to="/" onClick={logoutHandler}>
//         로그아웃
//       </Link>
//     </div>
//     // document.getElementById('portal')
//   );
// };

// export default UserMenu;
