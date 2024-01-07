// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import '../../styles/style.scss';
// import { removeUserInfo } from '../../store/user.slice';
// import axios from 'axios';

// const HeaderUser = () => {

//   return (
//     <div>
//       {loginUser.u_idx === null ? (
//         <Link to="/login">로그인</Link>
//       ) : (
//         <div className="logined-user" onClick={userMenuHandler}>
//           <div>{`${loginUser.nickname}`}</div>
//           <img src={`http://localhost:8000/${loginUser.u_img}`} alt="" />
//         </div>
//       )}
//       {userMenuClicked && (
//         <div className="user-menu">
//           <Link to="/">관심 목록</Link>
//           <Link to="/">마이페이지</Link>
//           <Link to="/" onClick={logoutHandler}>
//             로그아웃
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeaderUser;
