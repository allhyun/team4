import React from 'react';
import '../styles/main_style.scss';
import Header from '../components/Component/Header';
import MainContainer from '../components/Component/MainContainer';
import Sidebar from '../components/Component/Sidebar';

export default function MainPage() {
  return (
    <>
      <div className="layout">
        <div className="main header maincenter">
          <Header />
        </div>
        <div className="main sidebar maincenter">
          <Sidebar />
        </div>
        <div className="main container maincenter">
          <MainContainer />
        </div>
      </div>
    </>
  );
}
