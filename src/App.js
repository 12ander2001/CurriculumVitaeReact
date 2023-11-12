import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import CurriculumVitaeView from './components/CurriculumVitae';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/CurriculumVitae" element={<CurriculumVitaeView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
