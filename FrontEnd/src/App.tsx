import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StudyMainPage from './pages/Study/StudyMainPage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudyMainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
