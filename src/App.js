import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ConctactInfo from './components/ContactInfo'
import CurriculumVitae from './components/CurriculumVitae';
import CurriculumVitaeCreate from './components/CurriculumVitaeCreate';
import ContactInfoCreate from './components/ConctactInfoCreate';
import CurriculumVitaeVisualOthers from './components/CurriculumVitaeVisualOthers';
import CurriculumVitaeVisualMySelf from './components/CurriculumVitaeVisualMySelf'
import Home from './components/Home';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/curriculum-others" element={<CurriculumVitaeVisualOthers />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="create-contact" element={<ContactInfoCreate />} />
                <Route path="contactinfo" element={<ConctactInfo />} />
                <Route path="create-curriculum" element={<CurriculumVitaeCreate />} />
                <Route path="curriculum-vitae" element={<CurriculumVitae />} />
                <Route path="curriculum-myself" element={<CurriculumVitaeVisualMySelf />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

