import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import Home from './components/Home';
import CurriculumVitaeCreate from './components/CurriculumVitaeCreate';
import CurriculumVitaeVisual from './components/CurriculumVitaeVisual'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crear-curriculum" element={<CurriculumVitaeCreate />} />
          <Route path="/curriculum-vitae" element={<CurriculumVitaeVisual />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
