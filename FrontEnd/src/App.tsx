import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StudyMainPage from './pages/Study/StudyMainPage';

import LoginPage from './pages/UserPage';
import StudyDetailPage from './pages/Study/StudyDetailPage';
import StudyEditPage from './pages/Study/StudyEditPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<MainPage />}></Route>
          {/* 스터디게시판 */}
          <Route path="/study" element={<StudyMainPage />}></Route>
          <Route path="/study/edit" element={<StudyEditPage />}></Route>
          <Route path="/study/detail" element={<StudyDetailPage />}></Route>

          {/* 유저관련 페이지 */}
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
