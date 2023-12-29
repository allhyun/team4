import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Main from './pages/Main/Main';
import StudyMainPage from './pages/Study/StudyMainPage';
import LoginPage from './pages/UserPage';
import StudyDetailPage from './pages/Study/StudyDetailPage';
import StudyEditPage from './pages/Study/StudyEditPage';
import MarketMain from './pages/Market/MarketMain';
import MarketEdit from './pages/Market/MarketEdit';
import MarketDetail from './pages/Market/MarketDetail';

function App() {
  return (
    <BrowserRouter>
      {/* 레이아웃 - 헤더/사이드바/메인 */}
      <Header />
      <Sidebar />
      <Main>
        <Routes>
          {/* 유저관련 페이지 */}
          <Route path="/loginpage" element={<LoginPage />}></Route>

          {/* 중고마켓 */}
          <Route path="/market" element={<MarketMain />}></Route>
          <Route path="/market/edit" element={<MarketEdit />}></Route>
          <Route path="/market/detail" element={<MarketDetail />}></Route>

          {/* 스터디게시판 */}
          <Route path="/study" element={<StudyMainPage />}></Route>
          <Route path="/study/edit" element={<StudyEditPage />}></Route>
          <Route path="/study/detail" element={<StudyDetailPage />}></Route>
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
