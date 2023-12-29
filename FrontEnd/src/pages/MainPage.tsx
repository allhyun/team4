import React from 'react';
import '../styles/pages/_main.scss';

import Header from '../components/Component/Header';
import Sidebar from '../components/Component/Sidebar';

export default function MainPage() {
  return (
    <>
      <div className="layout">
        <Header />
        <Sidebar />
        <div className="main">여기는 메인</div>
        <div> 박스</div>
      </div>
    </>
  );
}
